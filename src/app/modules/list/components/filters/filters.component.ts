import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
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
import { GeographyService } from 'src/app/core/services/geography.service';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from 'src/app/core/enums/experience.enum';

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
    TranslateModule,
  ],
})
export class FiltersComponent implements OnInit {
  @Input() title: string = '';
  @Input() isMusiciansList: boolean = true;
  @Output() filterSelected = new EventEmitter<any>();

  readonly experienceTypes = [
    { name: Experience.BEGINNER },
    { name: Experience.INTERMEDIATE },
    { name: Experience.EXPERT },
  ];

  readonly lookingBand = [{ name: 'Sí' }, { name: 'No' }];
  formGroup: FormGroup;
  instruments: Instrument[] = [];
  genres: Genre[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private instrumentService: InstrumentService,
    private genreService: GenreService,
    private geographyService: GeographyService
  ) {
    this.formGroup = this.fb.group({
      firstName: [''],
      instruments: [''],
      genres: [''],
      experience: [''],
      country: [''],
      state: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      lookingBand: [''],
    });
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['firstName'].value ||
      controls['instruments'].value.length > 0 ||
      controls['genres'].value.length > 0 ||
      controls['experience'].value ||
      controls['country'].value ||
      controls['state'].value ||
      controls['city'].value ||
      controls['lookingBand'].value
    );
  }

  ngOnInit(): void {
    let storedData = localStorage.getItem('filter-data');
    if (storedData) {
      this.setFormGroup(JSON.parse(storedData));
      if (this.formGroup.get('country')?.value) {
        this.getStates(this.formGroup.get('country')?.value);
        this.formGroup.get('state')?.enable();

        if (this.formGroup.get('state')?.value) {
          this.getCities(
            this.formGroup.get('country')?.value,
            this.formGroup.get('state')?.value
          );
          this.formGroup.get('city')?.enable();
        }
      }
    }
    this.getInstruments();
    this.getGenres();
    this.getCountries();
    this.formGroup.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      localStorage.setItem('filter-data', JSON.stringify(value));

      if (value.lookingBand) {
        value.lookingBand = value.lookingBand === 'Sí' ? true : false;
      }
      this.filterSelected.emit(value);
    });

    this.formGroup.get('country')?.valueChanges.subscribe((country) => {
      if (country) {
        this.getStates(country);
        this.formGroup.get('state')?.enable();
      } else {
        this.formGroup.get('state')?.disable();
        this.formGroup.get('city')?.disable();
      }
    });

    this.formGroup.get('state')?.valueChanges.subscribe((state) => {
      if (state) {
        this.getCities(this.formGroup.get('country')?.value, state);
        this.formGroup.get('city')?.enable();
      }
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

    if (controls['firstName'].value) {
      selectedKeys.push('firstName');
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
    if (controls['state'].value) {
      selectedKeys.push('state');
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

  getCountries(): void {
    this.geographyService.getCountries().subscribe((result) => {
      this.countries = result.data;
    });
  }

  getStates(country: string): void {
    this.geographyService.getStates(country).subscribe((result) => {
      this.states = result.data.states;
    });
  }

  getCities(country: string, state: string): void {
    this.geographyService.getCities(country, state).subscribe(
      (result) =>
        (this.cities = result.data.map((city: string) => {
          return { name: city };
        }))
    );
  }
}
