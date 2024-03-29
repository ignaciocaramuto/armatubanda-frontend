import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationDialogComponent } from './add-application-dialog.component';

describe('AddApplicationDialogComponent', () => {
  let component: AddApplicationDialogComponent;
  let fixture: ComponentFixture<AddApplicationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddApplicationDialogComponent]
    });
    fixture = TestBed.createComponent(AddApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
