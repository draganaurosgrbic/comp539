import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { StorageService } from '../services/storage.service';
import { ROUTES } from '../utils/routes';
import { UrlService } from '../services/url.service';
import { Url } from '../model/url';

import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from '../../environments/environment.development';

const isUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

@Component({
  selector: 'fetch-url-dialog',
  templateUrl: 'fetch-url-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class FetchUrlDialog {
  readonly dialogRef = inject(MatDialogRef<FetchUrlDialog>);
  readonly urlData = inject<Url>(MAT_DIALOG_DATA) as unknown as Url;

  cancel() {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'create-url-dialog',
  templateUrl: 'create-url-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CreateUrlDialog {
  readonly dialogRef = inject(MatDialogRef<CreateUrlDialog>);
  private _snackBar = inject(MatSnackBar);
  urlData!: Url;

  constructor(
    private urlService: UrlService,
    private storageService: StorageService,
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  createUrl(temp: HTMLInputElement) {
    const longUrl = temp.value;
    if (!longUrl.trim()) {
      this._snackBar.open("URL EMPTY!", "OK", {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'snackbar',
      });
      return;

    }

    if (!isUrlValid(longUrl)) {
      this._snackBar.open("URL INVALID!", "OK", {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'snackbar',
      });
      return;
    }

    this.urlService.postUrl(longUrl).subscribe(res => {
      this.urlData = res;
      this.storageService.storeUrl(res);
    });
  }
}


@Component({
  selector: 'app-url',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss',
})
export class UrlComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  dataSource: string[] = [];
  displayColumns = ['shortUrl', 'action']
  urlData: Url = {} as Url;

  constructor(
    private urlService: UrlService,
    private storageService: StorageService,
    private router: Router,
    private clipboard: Clipboard,
  ) { }

  ngOnInit() {
    this.dataSource = this.storageService.getUrls() || [];
  }

  logout() {
    this.storageService.removeToken();
    this.router.navigate([ROUTES.login]);
  }

  viewRecord(shortUrl: string) {
    this.urlService.getUrl(shortUrl).subscribe(res => this.dialog.open(FetchUrlDialog, { data: res }));
  }

  visitLink(shortUrl: string) {
    this.urlService.getUrl(shortUrl).subscribe(res => window.open(res.longUrl, '_blank'));
  }

  copyLink(shortUrl: string) {
    this.clipboard.copy(`${environment.apiUrl.replace('/api', '')}/${shortUrl}`);
  }

  addUrl() {
    this.dialog.open(CreateUrlDialog).afterClosed().subscribe(() => this.ngOnInit());
  }

}
