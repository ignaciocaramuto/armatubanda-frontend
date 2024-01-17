import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToBandDialogComponent } from './invite-to-band-dialog.component';

describe('InviteToBandDialogComponent', () => {
  let component: InviteToBandDialogComponent;
  let fixture: ComponentFixture<InviteToBandDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InviteToBandDialogComponent]
    });
    fixture = TestBed.createComponent(InviteToBandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
