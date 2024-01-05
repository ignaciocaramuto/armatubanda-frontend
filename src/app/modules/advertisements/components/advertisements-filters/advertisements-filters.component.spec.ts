import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsFiltersComponent } from './advertisements-filters.component';

describe('AdvertisementsFiltersComponent', () => {
  let component: AdvertisementsFiltersComponent;
  let fixture: ComponentFixture<AdvertisementsFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdvertisementsFiltersComponent]
    });
    fixture = TestBed.createComponent(AdvertisementsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
