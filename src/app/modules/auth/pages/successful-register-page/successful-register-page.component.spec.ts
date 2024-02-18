import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulRegisterPageComponent } from './successful-register-page.component';

describe('SuccessfulRegisterPageComponent', () => {
  let component: SuccessfulRegisterPageComponent;
  let fixture: ComponentFixture<SuccessfulRegisterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuccessfulRegisterPageComponent]
    });
    fixture = TestBed.createComponent(SuccessfulRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
