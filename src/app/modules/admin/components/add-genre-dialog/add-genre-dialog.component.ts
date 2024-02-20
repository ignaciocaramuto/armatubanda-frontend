import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { AddInstrumentDialogComponent } from '../add-instrument-dialog/add-instrument-dialog.component';

@Component({
  selector: 'app-add-genre-dialog',
  standalone: true,
  imports: [DialogComponent, ReactiveFormsModule, InputTextComponent],
  templateUrl: './add-genre-dialog.component.html',
  styleUrls: ['./add-genre-dialog.component.scss'],
})
export class AddGenreDialogComponent {
  genre = new FormControl('', Validators.required);
  private dialogRef = inject(MatDialogRef<AddInstrumentDialogComponent>);

  confirmGenre(): void {
    if (this.genre.valid) {
      this.dialogRef.close(this.genre.value);
    }
  }
}
