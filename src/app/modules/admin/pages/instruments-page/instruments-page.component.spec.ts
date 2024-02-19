import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsPageComponent } from './instruments-page.component';

describe('InstrumentsPageComponent', () => {
  let component: InstrumentsPageComponent;
  let fixture: ComponentFixture<InstrumentsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InstrumentsPageComponent]
    });
    fixture = TestBed.createComponent(InstrumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
