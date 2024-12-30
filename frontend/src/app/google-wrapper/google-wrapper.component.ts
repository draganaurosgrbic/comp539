import { Component, Input } from '@angular/core';
import { GoogleLoginComponent } from '../google-login/google-login.component';

@Component({
  selector: 'app-google-wrapper',
  standalone: true,
  imports: [GoogleLoginComponent],
  templateUrl: './google-wrapper.component.html',
  styleUrl: './google-wrapper.component.scss'
})
export class GoogleWrapperComponent {

  @Input() buttonText!: string;

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

}
