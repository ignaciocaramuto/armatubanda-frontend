import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';
import { UserType } from 'src/app/core/enums/userType.enum';
import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { GenreService } from 'src/app/shared/services/genre.service';
import { InstrumentService } from 'src/app/shared/services/instrument.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Output() filterSelected = new EventEmitter<any>();
  readonly experienceTypes = [
    { name: ExperienceType.Beginner },
    { name: ExperienceType.Intermediate },
    { name: ExperienceType.Expert },
  ];
  readonly userTypes = [{ name: UserType.Musician }, { name: UserType.Band }];
  formGroup: FormGroup;
  instruments: Instrument[] = [];
  genres: Genre[] = [];

  constructor(
    private fb: FormBuilder,
    private instrumentService: InstrumentService,
    private genreService: GenreService
  ) {
    this.formGroup = this.fb.group({
      userType: [''],
      name: [''],
      instruments: [''],
      genres: [''],
      experience: [''],
    });
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['userType'].value ||
      controls['name'].value ||
      controls['instruments'].value.length > 0 ||
      controls['genres'].value.length > 0 ||
      controls['experience'].value
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

    if (controls['userType'].value) {
      selectedKeys.push('userType');
    }
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

    return selectedKeys;
  }

  removeChip(controlName: string): void {
    this.formGroup.get(controlName)?.reset();
  }

  removeAllFilters(): void {
    this.formGroup.reset();
  }

  setFormGroup(values?: any) {
    this.formGroup = this.fb.group({
      userType: [values.userType || ''],
      name: [values.name || ''],
      instruments: [values.instruments || []], // Asegura que sea un array
      genres: [values.genres || []], // Asegura que sea un array
      experience: [values.experience || ''],
    });
  }
}
