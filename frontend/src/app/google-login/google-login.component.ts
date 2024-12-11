import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent  {

  @Input() buttonText!: string;
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }

}
