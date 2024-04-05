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
import { Experience } from 'src/app/core/enums/experience.enum';

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
    { name: Experience.BEGINNER },
    { name: Experience.INTERMEDIATE },
    { name: Experience.EXPERT },
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
    lookingBands: ['', Validators.required],
    career: this.fb.array([]),
    genres: ['', Validators.required],
    instruments: ['', Validators.required],
  });

  profileImageformGroup: FormGroup = this.fb.group({
    profileImage: ['', Validators.required],
  });

  get career(): FormArray {
    return this.personalformGroup.controls['career'] as FormArray;
  }

  get careerFormArrayControls(): FormGroup[] {
    return (this.personalformGroup.controls['career'] as FormArray)
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
    if (this.personalformGroup.valid && this.profileImageformGroup.valid) {
      const urlPatch = !edition
        ? `${this.baseUrl}/musician`
        : `${this.baseUrl}/musician/edit`;

      const form = new FormData();

      form.append('firstName', this.personalformGroup.get('firstName')?.value);
      form.append('lastName', this.personalformGroup.get('lastName')?.value);
      form.append('stageName', this.personalformGroup.get('stageName')?.value);
      form.append('country', this.personalformGroup.get('country')?.value);
      form.append('state', this.personalformGroup.get('state')?.value);
      form.append('city', this.personalformGroup.get('city')?.value);
      form.append(
        'phoneNumber',
        this.personalformGroup.get('phoneNumber')?.value
      );
      form.append('birthday', this.personalformGroup.get('birthday')?.value);
      form.append('webSite', this.personalformGroup.get('webSite')?.value);
      form.append(
        'socialMedia',
        this.personalformGroup.get('socialMedia')?.value
      );
      form.append(
        'lookingBands',
        this.personalformGroup.get('lookingBands')?.value
      );
      form.append('career', this.personalformGroup.get('career')?.value);
      form.append('genres', this.personalformGroup.get('genres')?.value);
      form.append(
        'instruments',
        this.personalformGroup.get('instruments')?.value
      );

      if (this.profileImageformGroup.get('profileImage')?.value) {
        form.append(
          'profileImage',
          this.profileImageformGroup.get('profileImage')?.value
        );
      }

      this.http.patch<FormData>(urlPatch, form).subscribe({
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

  private setFormGroupValues(musician: Musician): void {
    // Personal
    this.personalformGroup.get('firstName')?.setValue(musician.firstName);
    this.personalformGroup.get('lastName')?.setValue(musician.lastName);
    this.personalformGroup.get('stageName')?.setValue(musician.stageName);
    this.personalformGroup.get('country')?.setValue(musician.country);
    this.personalformGroup.get('state')?.setValue(musician.state);
    this.personalformGroup.get('city')?.setValue(musician.city);
    this.personalformGroup.get('phoneNumber')?.setValue(musician.phoneNumber);
    this.personalformGroup.get('birthday')?.setValue(musician.birthday);
    this.personalformGroup.get('webSite')?.setValue(musician.webSite);
    this.personalformGroup.get('socialMedia')?.setValue(musician.socialMedia);

    // Carreer

    // Academic history

    // Preferences

    // Profile image
    if (musician.imagePath) {
      // this.profileImageformGroup
      //   .get('profileImage')
      //   ?.setValue(this.fileConverterPipe.transform(musician.profileImage));
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
