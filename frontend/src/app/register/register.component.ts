import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleWrapperComponent } from '../google-wrapper/google-wrapper.component';
import { Subscription } from 'rxjs';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { User } from '../model/user';
import { ROUTES } from '../utils/routes';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    GoogleWrapperComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  registerForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private userService: UserService,
    private authService: SocialAuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.userService.register(user as unknown as User).subscribe(res => {
        this.storageService.setToken(res.password);
        this.router.navigate([ROUTES.url]);
      })
    });

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    this.userService.register(this.registerForm.value).subscribe(() => {
      this.router.navigate([ROUTES.login]);
    }, () => {
      this._snackBar.open("ERROR!", "CLOSE");
    });
  }

  login() {
    this.router.navigate([ROUTES.login]);
  }

}
