import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleWrapperComponent } from './google-wrapper.component';

describe('GoogleWrapperComponent', () => {
  let component: GoogleWrapperComponent;
  let fixture: ComponentFixture<GoogleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
