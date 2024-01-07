import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBandProfileComponent } from './create-band-profile.component';

describe('CreateBandProfileComponent', () => {
  let component: CreateBandProfileComponent;
  let fixture: ComponentFixture<CreateBandProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateBandProfileComponent]
    });
    fixture = TestBed.createComponent(CreateBandProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
