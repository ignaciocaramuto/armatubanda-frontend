import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedComponent } from './profile-feed.component';

describe('ProfileFeedComponent', () => {
  let component: ProfileFeedComponent;
  let fixture: ComponentFixture<ProfileFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ProfileFeedComponent]
});
    fixture = TestBed.createComponent(ProfileFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
