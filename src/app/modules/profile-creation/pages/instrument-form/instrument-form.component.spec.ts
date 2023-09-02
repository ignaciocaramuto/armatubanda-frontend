import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentFormComponent } from './instrument-form.component';

describe('InstrumentFormComponent', () => {
  let component: InstrumentFormComponent;
  let fixture: ComponentFixture<InstrumentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentFormComponent]
    });
    fixture = TestBed.createComponent(InstrumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
