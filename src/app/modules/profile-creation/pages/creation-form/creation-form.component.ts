import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';
import { DragAndDropComponent } from '../../../../core/components/drag-and-drop/drag-and-drop.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { InputSelectComponent } from '../../../../core/components/input-select/input-select.component';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Genre } from 'src/app/core/models/genre.interface';
import { GenreService } from 'src/app/core/services/genre.service';
import { tap } from 'rxjs';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { Musician } from 'src/app/core/models/musician';
import { ConvertImageToFilePipe } from 'src/app/core/pipes/convert-image-to-file.pipe';
import { GeographyService } from 'src/app/core/services/geography.service';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CreationFormComponent,
      multi: true,
    },
    ConvertImageToFilePipe,
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    NgFor,
    InputSelectComponent,
    MatIconModule,
    ButtonComponent,
    DragAndDropComponent,
    NgIf,
  ],
})
export class CreationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly baseUrl: string = environment.apiUrl;
  private instrumentService = inject(InstrumentService);
  private http = inject(HttpClient);
  private _logMessageService = inject(LogMessageService);
  private genreService = inject(GenreService);
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);
  private fileConverterPipe = inject(ConvertImageToFilePipe);
  private geographyService = inject(GeographyService);

  instruments: Instrument[] = [];
  genres: Genre[] = [];
  musician!: Musician;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  hideStates: boolean = false;

  readonly experienceTypes = [
    { name: ExperienceType.Novice },
    { name: ExperienceType.Advanced },
    { name: ExperienceType.Expert },
  ];
  readonly lookingBand = [{ name: 'Sí' }, { name: 'No' }];

  personalformGroup: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    stageName: ['', Validators.required],
    country: ['', Validators.required],
    state: [{ value: '', disabled: true }, Validators.required],
    city: [{ value: '', disabled: true }],
    phoneNumber: ['', Validators.required],
    birthday: ['', Validators.required],
    webSite: [''],
    socialMedia: [''],
  });

  bioformGroup: FormGroup = this.fb.group({
    bio: ['', [Validators.maxLength(512), Validators.required]],
    career: this.fb.array([]),
  });

  profileImageformGroup: FormGroup = this.fb.group({
    profileImage: ['', Validators.required],
  });

  skillsFormGroup: FormGroup = this.fb.group({
    generalExperience: ['', Validators.required],
    skills: this.fb.array([]),
  });

  academicHistoryFormGroup: FormGroup = this.fb.group({
    academics: this.fb.array([]),
  });

  preferencesFormGroup: FormGroup = this.fb.group({
    lookingBands: ['', Validators.required],
    available: ['', Validators.required],
  });

  genresFormGroup: FormGroup = this.fb.group({
    genres: ['', Validators.required],
  });

  get skills(): FormArray {
    return this.skillsFormGroup.controls['skills'] as FormArray;
  }

  get skillsFormArrayControls(): FormGroup[] {
    return (this.skillsFormGroup.controls['skills'] as FormArray)
      .controls as FormGroup[];
  }

  get career(): FormArray {
    return this.bioformGroup.controls['career'] as FormArray;
  }

  get academics(): FormArray {
    return this.academicHistoryFormGroup.controls['academics'] as FormArray;
  }

  get careerFormArrayControls(): FormGroup[] {
    return (this.bioformGroup.controls['career'] as FormArray)
      .controls as FormGroup[];
  }

  get academicsFormArrayControls(): FormGroup[] {
    return (this.academicHistoryFormGroup.controls['academics'] as FormArray)
      .controls as FormGroup[];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.profileService.getById(id).subscribe((result) => {
          this.musician = result;
          this.setFormGroupValues(this.musician);
        });
      }
    });

    this.getInstruments();
    this.getGenres();
    this.getCountries();

    this.personalformGroup.get('country')?.valueChanges.subscribe((country) => {
      if (country) {
        this.personalformGroup.get('state')?.reset();
        this.personalformGroup.get('city')?.reset();
        this.getStates(country);
      }
    });

    this.personalformGroup.get('state')?.valueChanges.subscribe((state) => {
      if (state) {
        this.getCities(this.personalformGroup.get('country')?.value, state);
        this.personalformGroup.get('city')?.enable();
      }
    });
  }

  onSubmit(edition?: boolean): void {
    if (
      this.personalformGroup.valid &&
      this.bioformGroup.valid &&
      this.profileImageformGroup.valid
    ) {
      const urlPut = !edition
        ? `${this.baseUrl}/musician`
        : `${this.baseUrl}/musician/edit`;

      const musician = {
        musicianId: this.musician?.id,
        personalInformation: {
          name: this.personalformGroup.get('firstName')?.value,
          lastname: this.personalformGroup.get('lastName')?.value,
          stageName: this.personalformGroup.get('stageName')?.value,
          country: this.personalformGroup.get('country')?.value,
          state: this.personalformGroup.get('state')?.value,
          city: this.personalformGroup.get('city')?.value,
          birthday: this.personalformGroup.get('birthday')?.value,
          gender: 'MALE',
        },
        contactInformation: {
          phoneNumber: this.personalformGroup.get('phoneNumber')?.value,
          webSite: this.personalformGroup.get('webSite')?.value,
          socialMedia: this.personalformGroup.get('socialMedia')?.value,
        },
        skillsInformation: {
          instrumentExperience: this.getInstrumentExperienceFormatted(
            this.skills.value
          ),
          genres: this.getGenresFormatted(this.genresFormGroup.value.genres),
          generalExperience:
            this.skillsFormGroup.get('generalExperience')?.value,
        },
        educationInformation: {
          educationHistory: this.academics.value,
        },
        careerInformation: {
          careerHistory: this.career.value,
        },
        biographyInformation: {
          bio: this.bioformGroup.get('bio')?.value,
        },
        preferenceInformation: {
          lookingBands:
            this.preferencesFormGroup.get('lookingBands')?.value === 'Sí'
              ? true
              : false,
          lookingMusician: false,
          available:
            this.preferencesFormGroup.get('available')?.value === 'Sí'
              ? true
              : false,
        },
      };

      const form = new FormData();
      form.append(
        'profileInfoDto',
        new Blob([JSON.stringify(musician)], {
          type: 'application/json ',
        })
      );

      if (this.profileImageformGroup.get('profileImage')?.value) {
        form.append(
          'profileImage',
          this.profileImageformGroup.get('profileImage')?.value
        );
      }

      this.http.put<FormData>(urlPut, form).subscribe({
        next: (resp) => {
          if (resp) {
            this.router.navigateByUrl('/list').then(() => {
              window.location.reload();
              this._logMessageService.logConfirm(
                edition
                  ? '¡Perfil editado exitosamente!'
                  : '¡Perfil creado exitosamente!'
              );
            });
          }
        },
      });
    }
  }

  getInstruments(): void {
    this.instrumentService
      .getInstruments()
      .subscribe((result) => (this.instruments = result));
  }

  getGenres(): void {
    this.genreService
      .getGenres()
      .pipe(tap((res) => (this.genres = res)))
      .subscribe();
  }

  setSelectedFile(event: any) {
    if (!event) {
      this.profileImageformGroup.get('profileImage')?.setValue(null);
      return;
    }
    this.profileImageformGroup
      .get('profileImage')
      ?.setValue(event?.target.files[0]);
  }

  addInstrument(): void {
    const instrumentForm = this.fb.group({
      instrument: ['', Validators.required],
      experience: ['beginner', Validators.required],
    });

    this.skills.push(instrumentForm);
  }

  deleteInstrument(skillIndex: number): void {
    this.skills.removeAt(skillIndex);
  }

  addCareer(): void {
    const careerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.career.push(careerForm);
  }

  deleteCareer(careerIndex: number): void {
    this.career.removeAt(careerIndex);
  }

  addStudy(): void {
    const studyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.academics.push(studyForm);
  }

  deleteStudy(studyIndex: number): void {
    this.academics.removeAt(studyIndex);
  }

  private getInstrumentExperienceFormatted(skills: any[]): any {
    return skills.map((skill) => ({
      experience: skill.experience,
      instrument: { name: skill.instrument },
    }));
  }

  private getGenresFormatted(genres: string[]): any[] {
    return genres.map((genre) => ({
      name: genre,
    }));
  }

  private setFormGroupValues(musician: Musician): void {
    // Personal
    this.personalformGroup
      .get('firstName')
      ?.setValue(musician.personalInformation.name);
    this.personalformGroup
      .get('lastName')
      ?.setValue(musician.personalInformation.lastname);
    this.personalformGroup
      .get('stageName')
      ?.setValue(musician.personalInformation.stageName);
    this.personalformGroup
      .get('country')
      ?.setValue(musician.personalInformation.country);
    this.personalformGroup
      .get('state')
      ?.setValue(musician.personalInformation.state);
    this.personalformGroup
      .get('city')
      ?.setValue(musician.personalInformation.city);
    this.personalformGroup
      .get('phoneNumber')
      ?.setValue(musician.contactInformation.phoneNumber);
    this.personalformGroup
      .get('birthday')
      ?.setValue(musician.personalInformation.birthday);
    this.personalformGroup
      .get('webSite')
      ?.setValue(musician.contactInformation.webSite);
    this.personalformGroup
      .get('socialMedia')
      ?.setValue(musician.contactInformation.socialMedia);

    // Instruments
    this.skillsFormGroup
      .get('generalExperience')
      ?.setValue(musician.skillsInformation.generalExperience);
    musician.skillsInformation.instrumentExperience.forEach(
      (instrumentExperience) => {
        const instrumentForm = this.fb.group({
          instrument: instrumentExperience.instrument.name,
          experience: instrumentExperience.experience,
        });
        this.skills.push(instrumentForm);
      }
    );

    // Genres
    this.genresFormGroup
      .get('genres')
      ?.setValue(musician.skillsInformation.genres.map(({ name }) => name));

    // Bio
    this.bioformGroup.get('bio')?.setValue(musician.biographyInformation.bio);

    // Carreer
    this.musician.careerInformation.careerHistory.forEach((carrer) => {
      const carrerForm = this.fb.group({
        name: carrer.name,
        description: carrer.description,
        startDate: carrer.startDate,
        endDate: carrer.endDate,
      });
      this.career.push(carrerForm);
    });

    // Academic history
    this.musician.educationInformation.educationHistory.forEach((education) => {
      const educationForm = this.fb.group({
        name: education.name,
        description: education.description,
        startDate: education.startDate,
        endDate: education.endDate,
      });
      this.academics.push(educationForm);
    });

    // Preferences
    this.preferencesFormGroup
      .get('lookingBands')
      ?.setValue(musician.preferenceInformation.lookingBands ? 'Sí' : 'No');
    this.preferencesFormGroup
      .get('available')
      ?.setValue(musician.preferenceInformation.available ? 'Sí' : 'No');

    // Profile image
    if (musician.profileImage) {
      this.profileImageformGroup
        .get('profileImage')
        ?.setValue(this.fileConverterPipe.transform(musician.profileImage));
    }
  }

  private getCountries(): void {
    this.geographyService.getCountries().subscribe((result) => {
      this.countries = result.data;
    });
  }

  private getStates(country: string): void {
    this.geographyService.getStates(country).subscribe((result) => {
      this.states = result.data.states;
      if (this.states.length === 0) {
        this.personalformGroup.get('state')?.clearValidators();
        this.hideStates = true;
        this.getCitiesFromCountry(country);
        this.personalformGroup.get('city')?.enable();
      } else {
        this.hideStates = false;
        this.personalformGroup.get('city')?.disable();
        this.personalformGroup.get('state')?.enable();
      }
    });
  }

  private getCities(country: string, state: string): void {
    this.geographyService.getCities(country, state).subscribe((result) => {
      this.cities = result.data.map((city: string) => {
        return { name: city };
      });
    });
  }

  private getCitiesFromCountry(country: string): void {
    this.geographyService.getCitiesFromCountry(country).subscribe((result) => {
      this.cities = result.data.map((city: string) => {
        return { name: city };
      });
    });
  }
}
