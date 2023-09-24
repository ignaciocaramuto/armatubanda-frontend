import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewsComponent } from './profile-reviews.component';

describe('ProfileReviewsComponent', () => {
  let component: ProfileReviewsComponent;
  let fixture: ComponentFixture<ProfileReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReviewsComponent]
    });
    fixture = TestBed.createComponent(ProfileReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
