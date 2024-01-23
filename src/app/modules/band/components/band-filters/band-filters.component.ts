import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { debounceTime, tap } from 'rxjs';
import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { GenreService } from 'src/app/core/services/genre.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';

@Component({
  selector: 'app-band-filters',
  standalone: true,
  imports: [
    MatButtonModule,
    MatChipsModule,
    NgFor,
    NgIf,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    InputSelectComponent,
    InputTextComponent,
  ],
  templateUrl: './band-filters.component.html',
  styleUrls: ['./band-filters.component.scss'],
})
export class BandFiltersComponent {
  @Output() filterSelected = new EventEmitter<any>();

  formGroup: FormGroup;
  instruments: Instrument[] = [];
  genres: Genre[] = [];

  constructor(
    private fb: FormBuilder,
    private instrumentService: InstrumentService,
    private genreService: GenreService
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      instruments: [''],
      genres: [''],
      country: [''],
      city: [''],
    });
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['name'].value ||
      controls['instruments'].value.length > 0 ||
      controls['genres'].value.length > 0 ||
      controls['country'].value ||
      controls['city'].value
    );
  }

  ngOnInit(): void {
    let storedData = localStorage.getItem('band-filter-data');
    if (storedData) {
      this.setFormGroup(JSON.parse(storedData));
    }
    this.getInstruments();
    this.getGenres();
    this.formGroup.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      localStorage.setItem('band-filter-data', JSON.stringify(value));
      this.filterSelected.emit(value);
    });
  }

  getInstruments(): void {
    this.instrumentService
      .getInstruments()
      .pipe(tap((res) => (this.instruments = res)))
      .subscribe();
  }

  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(tap((res) => (this.genres = res)))
      .subscribe();
  }

  getSelectedFilterKeys(): string[] {
    const selectedKeys: string[] = [];
    const controls = this.formGroup.controls;

    if (controls['name'].value) {
      selectedKeys.push('name');
    }
    if (controls['instruments'].value?.length > 0) {
      selectedKeys.push('instruments');
    }
    if (controls['genres'].value?.length > 0) {
      selectedKeys.push('genres');
    }
    if (controls['country'].value) {
      selectedKeys.push('country');
    }
    if (controls['city'].value) {
      selectedKeys.push('city');
    }

    return selectedKeys;
  }

  removeChip(controlName: string): void {
    this.formGroup.get(controlName)?.reset();
  }

  removeAllFilters(): void {
    this.formGroup.reset();
  }

  setFormGroup(values?: any) {
    Object.keys(values).map((controlName: string) => {
      if (this.formGroup.get(controlName)) {
        this.formGroup.get(controlName)?.setValue(values[controlName]);
      }
    });
  }
}
