import { Component, OnInit, forwardRef, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BasicProfile } from '../../interfaces/profile-creation.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstrumentService } from 'src/app/shared/services/instrument.service';
import { tap } from 'rxjs';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';

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
  ],
})
export class CreationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly baseUrl: string = environment.apiUrl;
  private instrumentService = inject(InstrumentService);
  private http = inject(HttpClient);
  private _logMessageService = inject(LogMessageService);

  instruments: Instrument[] = [];
  readonly experienceTypes = [
    { name: ExperienceType.Novice },
    { name: ExperienceType.Advanced },
    { name: ExperienceType.Expert },
  ];

  personalformGroup: FormGroup = this.fb.group({
    firstName: ['asd', Validators.required],
    lastName: ['asd', Validators.required],
    stageName: ['asd', Validators.required],
    country: ['asd', Validators.required],
    city: ['asd', Validators.required],
    phoneNumber: ['asd', Validators.required],
    birthday: ['', Validators.required],
    webSite: ['asd'],
    socialMediaLink: ['asd'],
  });

  bioformGroup: FormGroup = this.fb.group({
    bio: ['', [Validators.maxLength(512), Validators.required]],
    career: this.fb.array([]),
  });

  profileImageformGroup: FormGroup = this.fb.group({
    profileImage: [],
  });

  skillsFormGroup: FormGroup = this.fb.group({
    skills: this.fb.array([]),
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

  get careerFormArrayControls(): FormGroup[] {
    return (this.bioformGroup.controls['career'] as FormArray)
      .controls as FormGroup[];
  }

  ngOnInit(): void {
    this.getInstruments();
  }

  onSubmit(): void {
    if (this.personalformGroup.valid && this.bioformGroup.valid) {
      const urlPut = `${this.baseUrl}/musician/create-profile`;

      const musician = {
        personalInformation: {
          name: this.personalformGroup.get('firstName')?.value,
          lastname: this.personalformGroup.get('lastName')?.value,
          stageName: this.personalformGroup.get('stageName')?.value,
          country: this.personalformGroup.get('country')?.value,
          city: this.personalformGroup.get('city')?.value,
          birthday: this.personalformGroup.get('birthday')?.value,
          gender: 'MALE',
        },
        contactInformation: {
          phoneNumber: this.personalformGroup.get('phoneNumber')?.value,
          webSite: this.personalformGroup.get('webSite')?.value,
          socialMediaLink: this.personalformGroup.get('socialMediaLink')?.value,
        },
        skillsInformation: {
          instrumentExperience: [
            {
              instrument: {
                name: 'Guitarra',
              },
              experience: 'ADVANCED',
            },
            {
              instrument: {
                name: 'Violin',
              },
              experience: 'NOVICE',
            },
          ],
          genres: [
            {
              name: 'Rock',
            },
            {
              name: 'Jazz',
            },
          ],
          generalExperience: 'NOVICE',
        },
        educationInformation: {
          educationHistory: [
            {
              name: 'NombreBandaPrueba',
              description: 'Esta es mi trayectoria en la banda',
              startDate: '2023-09-10T00:00:00Z',
              endDate: '2023-09-15T00:00:00Z',
            },
            {
              name: 'NombreBandaDos',
              description: 'Esta es mi trayectoria en la banda dos',
              startDate: '2023-01-10T00:00:00Z',
              endDate: '2023-10-15T00:00:00Z',
            },
          ],
        },
        careerInformation: {
          careerHistory: [
            {
              name: 'EducacionFormal',
              description: 'En esta institucion comence mis estudios',
              startDate: '2023-09-10T00:00:00Z',
              endDate: '2023-09-15T00:00:00Z',
            },
            {
              name: 'InstitutoEducacionDos',
              description: 'Estudios en mi segunda institucion',
              startDate: '2023-01-10T00:00:00Z',
              endDate: '2023-10-15T00:00:00Z',
            },
          ],
        },
        biographyInformation: {
          bio: this.bioformGroup.get('bio')?.value,
        },
        preferenceInformation: {
          lookingBands: true,
          lookingMusician: false,
          available: true,
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
                '¡Perfil creado exitosamente!'
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

  setSelectedFile(event: any) {
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
}
