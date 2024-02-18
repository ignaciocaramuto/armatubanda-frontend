import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEmailPageComponent } from './confirmation-email-page.component';

describe('ConfirmationEmailPageComponent', () => {
  let component: ConfirmationEmailPageComponent;
  let fixture: ComponentFixture<ConfirmationEmailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationEmailPageComponent]
    });
    fixture = TestBed.createComponent(ConfirmationEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
