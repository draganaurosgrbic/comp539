// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoginComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import { GoogleWrapperComponent } from '../google-wrapper/google-wrapper.component';

// Mock Components
@Component({
  selector: 'app-google-login',
  template: '',
  standalone: true
})
class MockGoogleLoginComponent {}

@Component({
  selector: 'app-google-wrapper',
  template: '',
  standalone: true
})
class MockGoogleWrapperComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuthService = {
    authState: of(null),
    signIn: jasmine.createSpy('signIn'),
    signOut: jasmine.createSpy('signOut')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: SocialAuthService, useValue: mockAuthService }
      ]
    })
    .overrideComponent(LoginComponent, {
      remove: {
        imports: [
          SocialLoginModule, 
          GoogleLoginComponent, 
          GoogleWrapperComponent
        ]
      },
      add: {
        imports: [
          MockGoogleLoginComponent, 
          MockGoogleWrapperComponent
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});