import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
export class AddGenreDialogComponent implements OnInit {
  genre = new FormControl('', Validators.required);
  private dialogRef = inject(MatDialogRef<AddInstrumentDialogComponent>);
  private genreName = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.genreName) {
      this.genre.setValue(this.genreName);
    }
  }

  confirmGenre(): void {
    if (this.genre.valid) {
      this.dialogRef.close(this.genre.value);
    }
  }
}
