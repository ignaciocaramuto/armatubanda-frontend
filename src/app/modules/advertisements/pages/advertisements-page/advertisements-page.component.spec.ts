import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsPageComponent } from './advertisements-page.component';

describe('AdvertisementsPageComponent', () => {
  let component: AdvertisementsPageComponent;
  let fixture: ComponentFixture<AdvertisementsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdvertisementsPageComponent]
    });
    fixture = TestBed.createComponent(AdvertisementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
