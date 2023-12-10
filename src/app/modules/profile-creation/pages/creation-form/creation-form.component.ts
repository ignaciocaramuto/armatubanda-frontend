import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicProfile } from '../../interfaces/profile-creation.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstrumentService } from 'src/app/shared/services/instrument.service';
import { tap } from 'rxjs';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],
})
export class CreationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly baseUrl: string = environment.apiUrl;
  private instrumentService = inject(InstrumentService);
  private http = inject(HttpClient);
  private _logMessageService = inject(LogMessageService);

  instruments: Instrument[] = [];

  personalformGroup: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    stageName: ['', Validators.required],
  });

  contactformGroup: FormGroup = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  socialNetworkformGroup: FormGroup = this.fb.group({
    webSite: [''],
    socialMediaLink: [''],
  });

  instrumentstformGroup: FormGroup = this.fb.group({
    instruments: [null, Validators.required],
  });

  bioformGroup: FormGroup = this.fb.group({
    bio: ['', [Validators.maxLength(256)]],
  });

  profileImageformGroup: FormGroup = this.fb.group({
    profileImage: [],
  });

  ngOnInit(): void {
    this.getInstruments();
  }

  onSubmit(): void {
    if (
      this.personalformGroup.valid &&
      this.contactformGroup.valid &&
      this.instrumentstformGroup.valid &&
      this.bioformGroup.valid
    ) {
      const urlPut = `${this.baseUrl}/musician/create-profile`;

      const musician = {
        personalInformation: {
          name: this.personalformGroup.get('firstName')?.value,
          lastname: this.personalformGroup.get('lastName')?.value,
          stageName: this.personalformGroup.get('stageName')?.value,
          country: this.contactformGroup.get('country')?.value,
          city: this.contactformGroup.get('city')?.value,
          birthday: '2023-09-10T00:00:00Z',
          gender: 'MALE',
        },
        contactInformation: {
          phoneNumber: this.contactformGroup.get('phoneNumber')?.value,
          webSite: this.socialNetworkformGroup.get('webSite')?.value,
          socialMediaLink:
            this.socialNetworkformGroup.get('socialMediaLink')?.value,
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
}
