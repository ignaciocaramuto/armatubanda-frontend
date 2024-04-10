import { NgIf } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { forkJoin } from 'rxjs';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { GenreService } from 'src/app/core/services/genre.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { AdvertisementService } from 'src/app/modules/advertisements/services/advertisement.service';

@Component({
  selector: 'app-add-advertisement-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogComponent,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    InputSelectComponent,
    InputTextComponent,
  ],
  templateUrl: './add-advertisement-dialog.component.html',
  styleUrls: ['./add-advertisement-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAdvertisementDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private advertisementService = inject(AdvertisementService);
  private genreService = inject(GenreService);
  private instrumentService = inject(InstrumentService);
  private bandId = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddAdvertisementDialogComponent>);

  genres: Genre[] = [];
  instruments: Instrument[] = [];
  formGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    genres: ['', Validators.required],
    instruments: ['', Validators.required],
  });

  ngOnInit(): void {
    forkJoin({
      genres: this.genreService.getAll(),
      instruments: this.instrumentService.getAll(),
    }).subscribe(({ genres, instruments }) => {
      this.genres = genres;
      this.instruments = instruments;
    });
  }

  publishAdvertisement(): void {
    if (this.formGroup.valid) {
      this.advertisementService
        .createAdvertisement(this.bandId, this.formGroup.value)
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close();
          }
        });
    }
  }

  getGenresFormatted(genres: string[]): Genre[] {
    return genres.map((genre) => ({ id: 0, name: genre }));
  }

  getInstrumentsFormatted(instrument: string[]): Instrument[] {
    return instrument.map((instrument) => ({ id: 0, name: instrument }));
  }
}
