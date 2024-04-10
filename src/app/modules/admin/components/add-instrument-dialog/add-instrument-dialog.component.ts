import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';

@Component({
  selector: 'app-add-instrument-dialog',
  standalone: true,
  imports: [DialogComponent, ReactiveFormsModule, InputTextComponent],
  templateUrl: './add-instrument-dialog.component.html',
  styleUrls: ['./add-instrument-dialog.component.scss'],
})
export class AddInstrumentDialogComponent implements OnInit {
  instrument = new FormControl('', Validators.required);
  instrumentName = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddInstrumentDialogComponent>);

  ngOnInit(): void {
    if (this.instrumentName) {
      this.instrument.setValue(this.instrumentName);
    }
  }

  confirmInstrument(): void {
    if (this.instrument.valid) {
      this.dialogRef.close(this.instrument.value);
    }
  }
}
