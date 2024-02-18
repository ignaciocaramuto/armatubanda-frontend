import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEmailConfirmPageComponent } from './pending-email-confirm-page.component';

describe('PendingEmailConfirmPageComponent', () => {
  let component: PendingEmailConfirmPageComponent;
  let fixture: ComponentFixture<PendingEmailConfirmPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PendingEmailConfirmPageComponent]
    });
    fixture = TestBed.createComponent(PendingEmailConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
