import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';

@Component({
  selector: 'app-add-instrument-dialog',
  standalone: true,
  imports: [DialogComponent, ReactiveFormsModule, InputTextComponent],
  templateUrl: './add-instrument-dialog.component.html',
  styleUrls: ['./add-instrument-dialog.component.scss'],
})
export class AddInstrumentDialogComponent {
  instrument = new FormControl('', Validators.required);
  private dialogRef = inject(MatDialogRef<AddInstrumentDialogComponent>);

  confirmInstrument(): void {
    if (this.instrument.valid) {
      this.dialogRef.close(this.instrument.value);
    }
  }
}
