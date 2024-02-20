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
  genreId!: number;
  private dialogRef = inject(MatDialogRef<AddInstrumentDialogComponent>);
  private editGenre = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.editGenre) {
      this.genreId = this.editGenre.id;
      this.genre.setValue(this.editGenre.name);
    }
  }

  confirmGenre(): void {
    if (this.genre.valid) {
      if (this.genreId) {
        this.dialogRef.close({ id: this.genreId, name: this.genre.value });
        return;
      }
      this.dialogRef.close(this.genre.value);
    }
  }
}
