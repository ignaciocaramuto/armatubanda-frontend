import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertisementDialogComponent } from './add-advertisement-dialog.component';

describe('AddAdvertisementDialogComponent', () => {
  let component: AddAdvertisementDialogComponent;
  let fixture: ComponentFixture<AddAdvertisementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddAdvertisementDialogComponent]
    });
    fixture = TestBed.createComponent(AddAdvertisementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
