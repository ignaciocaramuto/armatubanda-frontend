import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandFiltersComponent } from './band-filters.component';

describe('BandFiltersComponent', () => {
  let component: BandFiltersComponent;
  let fixture: ComponentFixture<BandFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BandFiltersComponent]
    });
    fixture = TestBed.createComponent(BandFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
