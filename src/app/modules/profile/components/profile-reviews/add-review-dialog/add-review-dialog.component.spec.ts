import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewDialogComponent } from './add-review-dialog.component';

describe('AddReviewDialogComponent', () => {
  let component: AddReviewDialogComponent;
  let fixture: ComponentFixture<AddReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AddReviewDialogComponent]
});
    fixture = TestBed.createComponent(AddReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
