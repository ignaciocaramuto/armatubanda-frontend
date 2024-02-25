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
import { GeographyService } from 'src/app/core/services/geography.service';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './band-filters.component.html',
  styleUrls: ['./band-filters.component.scss'],
})
export class BandFiltersComponent {
  @Output() filterSelected = new EventEmitter<any>();

  formGroup: FormGroup;
  instruments: Instrument[] = [];
  genres: Genre[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private genreService: GenreService,
    private geographyService: GeographyService
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      genres: [''],
      country: [''],
      state: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
    });
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['name'].value ||
      controls['genres'].value.length > 0 ||
      controls['country'].value ||
      controls['state'].value ||
      controls['city'].value
    );
  }

  ngOnInit(): void {
    let storedData = localStorage.getItem('band-filter-data');
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
    this.getGenres();
    this.getCountries();
    this.formGroup.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      localStorage.setItem('band-filter-data', JSON.stringify(value));
      this.filterSelected.emit(value);
    });

    this.formGroup.get('country')?.valueChanges.subscribe((country) => {
      if (country) {
        this.getStates(country);
        this.formGroup.get('state')?.enable();
      }
    });

    this.formGroup.get('state')?.valueChanges.subscribe((state) => {
      if (state) {
        this.getCities(this.formGroup.get('country')?.value, state);
        this.formGroup.get('city')?.enable();
      }
    });
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
    if (controls['genres'].value?.length > 0) {
      selectedKeys.push('genres');
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

  private getCountries(): void {
    this.geographyService.getCountries().subscribe((result) => {
      this.countries = result.data;
    });
  }

  private getStates(country: string): void {
    this.geographyService.getStates(country).subscribe((result) => {
      this.states = result.data.states;
    });
  }

  private getCities(country: string, state: string): void {
    this.geographyService.getCities(country, state).subscribe((result) => {
      this.cities = result.data.map((city: string) => {
        return { name: city };
      });
    });
  }
}
