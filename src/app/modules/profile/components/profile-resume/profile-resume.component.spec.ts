import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResumeComponent } from './profile-resume.component';

describe('ProfileResumeComponent', () => {
  let component: ProfileResumeComponent;
  let fixture: ComponentFixture<ProfileResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ProfileResumeComponent]
});
    fixture = TestBed.createComponent(ProfileResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
