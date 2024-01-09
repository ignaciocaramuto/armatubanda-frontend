import { Component, OnInit, forwardRef, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BasicProfile } from '../../interfaces/profile-creation.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { tap } from 'rxjs';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { ExperienceType } from 'src/app/core/enums/experienceType.enum';
import { DragAndDropComponent } from '../../../../core/components/drag-and-drop/drag-and-drop.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { InputSelectComponent } from '../../../../core/components/input-select/input-select.component';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { MatStepperModule } from '@angular/material/stepper';

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

  academicHistoryFormGroup: FormGroup = this.fb.group({
    academics: this.fb.array([]),
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
          instrumentExperience: this.getInstrumentExperienceFormatted(
            this.skills.value
          ),
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
          educationHistory: this.academics.value,
        },
        careerInformation: {
          careerHistory: this.career.value,
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
    return skills.map((skill) => {
      return {
        experience: skill.experience,
        instrument: { name: skill.instrument },
      };
    });
  }
}
