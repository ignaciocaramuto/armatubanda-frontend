import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstrumentDialogComponent } from './add-instrument-dialog.component';

describe('AddInstrumentDialogComponent', () => {
  let component: AddInstrumentDialogComponent;
  let fixture: ComponentFixture<AddInstrumentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddInstrumentDialogComponent]
    });
    fixture = TestBed.createComponent(AddInstrumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
