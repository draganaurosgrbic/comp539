// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UrlComponent } from './url.component';

// describe('UrlComponent', () => {
//   let component: UrlComponent;
//   let fixture: ComponentFixture<UrlComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UrlComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(UrlComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlComponent } from './url.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('UrlComponent', () => {
  let component: UrlComponent;
  let fixture: ComponentFixture<UrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UrlComponent,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});