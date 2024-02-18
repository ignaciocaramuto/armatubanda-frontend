import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';
import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { GenreService } from 'src/app/core/services/genre.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { InputSelectComponent } from '../../../../core/components/input-select/input-select.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
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
})
export class FiltersComponent implements OnInit {
  @Input() title: string = '';
  @Input() isMusiciansList: boolean = true;
  @Output() filterSelected = new EventEmitter<any>();

  readonly experienceTypes = [
    { name: ExperienceType.Novice },
    { name: ExperienceType.Advanced },
    { name: ExperienceType.Expert },
  ];

  readonly lookingBand = [{ name: 'Sí' }, { name: 'No' }];
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
      experience: [''],
      country: [''],
      city: [''],
      lookingBand: [''],
    });
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['name'].value ||
      controls['instruments'].value.length > 0 ||
      controls['genres'].value.length > 0 ||
      controls['experience'].value ||
      controls['country'].value ||
      controls['city'].value ||
      controls['lookingBand'].value
    );
  }

  ngOnInit(): void {
    let storedData = localStorage.getItem('filter-data');
    if (storedData) {
      this.setFormGroup(JSON.parse(storedData));
    }
    this.getInstruments();
    this.getGenres();
    this.formGroup.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      localStorage.setItem('filter-data', JSON.stringify(value));

      if (value.lookingBand) {
        value.lookingBand = value.lookingBand === 'Sí' ? true : false;
      }
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
    if (controls['experience'].value) {
      selectedKeys.push('experience');
    }
    if (controls['country'].value) {
      selectedKeys.push('country');
    }
    if (controls['city'].value) {
      selectedKeys.push('city');
    }
    if (controls['lookingBand'].value) {
      selectedKeys.push('lookingBand');
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
