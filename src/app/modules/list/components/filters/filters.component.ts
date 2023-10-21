import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';
import { UserType } from 'src/app/core/enums/userType.enum';
import { Instrument } from 'src/app/core/models/instrument.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
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
  instruments: Instrument[];

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      userType: [''],
      name: [''],
      instruments: [''],
      experience: [''],
    });
    this.instruments = [
      { name: 'Guitarra', id: 1 },
      { name: 'Trumpet', id: 2 },
      { name: 'Bass', id: 3 },
      { name: 'Saxophone', id: 4 },
    ];
  }

  get isFilterSelected(): boolean {
    const controls = this.formGroup.controls;
    return (
      controls['userType'].value ||
      controls['name'].value ||
      controls['instruments'].value.length > 0 ||
      controls['experience'].value
    );
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(debounceTime(400)).subscribe(() => {
      this.filterSelected.emit(this.formGroup.value);
    });
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
}
