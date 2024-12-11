import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { StorageService } from '../services/storage.service';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { GoogleWrapperComponent } from '../google-wrapper/google-wrapper.component';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { ROUTES } from '../utils/routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleLoginComponent,
    SocialLoginModule,
    CommonModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButtonModule,
    GoogleWrapperComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  authSubscription!: Subscription;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: SocialAuthService,
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.userService.register(user as unknown as User).subscribe(res => {
        this.storageService.setToken(res.password);
        this.router.navigate([ROUTES.url]);
      })
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(res => {
      this.storageService.setToken(res.password);
      this.router.navigate([ROUTES.url]);
    }, () => {
      this._snackBar.open("ERROR!", "CLOSE");
    });
  }

  register() {
    this.router.navigate([ROUTES.register]);
  }

}
