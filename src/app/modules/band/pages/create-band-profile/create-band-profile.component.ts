import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { MatCardModule } from '@angular/material/card';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BandService } from '../../services/band.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { Genre } from 'src/app/core/models/genre.interface';
import { GenreService } from 'src/app/core/services/genre.service';
import { BandProfile } from '../../models/bandProfile.interface';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { ConvertImageToFilePipe } from 'src/app/core/pipes/convert-image-to-file.pipe';
import { GeographyService } from 'src/app/core/services/geography.service';

@Component({
  selector: 'app-create-band-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    InputTextComponent,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    DragAndDropComponent,
    ButtonComponent,
    MatButtonModule,
    FormsModule,
    InputSelectComponent,
  ],
  templateUrl: './create-band-profile.component.html',
  styleUrls: ['./create-band-profile.component.scss'],
  providers: [ConvertImageToFilePipe],
})
export class CreateBandProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private user = this.authService.currentUser();
  private bandService = inject(BandService);
  private router = inject(Router);
  private genreService = inject(GenreService);
  private route = inject(ActivatedRoute);
  private _logMessageService = inject(LogMessageService);
  private fileConverterPipe = inject(ConvertImageToFilePipe);
  private geographyService = inject(GeographyService);

  genres: Genre[] = [];
  band!: BandProfile;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  bandInfoFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    country: ['', Validators.required],
    state: [{ value: '', disabled: true }, Validators.required],
    city: [{ value: '', disabled: true }],
    phoneNumber: [''],
    webSite: [''],
    socialMedia: [''],
    bandGenres: ['', Validators.required],
  });

  profileImageformGroup: FormGroup = this.fb.group({
    bandProfileImage: ['', Validators.required],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.bandService.getById(id).subscribe((result) => {
          this.band = result;
          this.setFormGroupValues(this.band);
        });
      }
    });
    this.genreService.getAll().subscribe((result) => (this.genres = result));
    this.getCountries();

    this.bandInfoFormGroup.get('country')?.valueChanges.subscribe((country) => {
      if (country) {
        this.getStates(country);
        this.bandInfoFormGroup.get('state')?.enable();
      }
    });

    this.bandInfoFormGroup.get('state')?.valueChanges.subscribe((state) => {
      if (state) {
        this.getCities(this.bandInfoFormGroup.get('country')?.value, state);
        this.bandInfoFormGroup.get('city')?.enable();
      }
    });
  }

  setSelectedFile(event: any) {
    this.profileImageformGroup
      .get('bandProfileImage')
      ?.setValue(event?.target.files[0]);
  }

  onSubmit(edition?: true): void {
    if (this.bandInfoFormGroup.valid && this.profileImageformGroup.valid) {
      const band = {
        bandId: this.band?.bandId,
        bandInfo: {
          name: this.bandInfoFormGroup.get('name')?.value,
          description: this.bandInfoFormGroup.get('description')?.value,
          country: this.bandInfoFormGroup.get('country')?.value,
          state: this.bandInfoFormGroup.get('state')?.value,
          city: this.bandInfoFormGroup.get('city')?.value,
        },
        bandContactInfo: {
          phoneNumber: this.bandInfoFormGroup.get('phoneNumber')?.value,
          webSite: this.bandInfoFormGroup.get('webSite')?.value,
          socialMedia: this.bandInfoFormGroup.get('socialMedia')?.value,
        },
        leaderName: this.user()?.firstName,
        bandGenres: this.bandInfoFormGroup.get('bandGenres')?.value,
      };

      const form = new FormData();
      form.append(
        'band',
        new Blob([JSON.stringify(band)], {
          type: 'application/json ',
        })
      );

      if (this.profileImageformGroup.get('bandProfileImage')?.value) {
        form.append(
          'bandImageFile',
          this.profileImageformGroup.get('bandProfileImage')?.value
        );
      }

      if (edition) {
        this.bandService.editProfile(form).subscribe((result) => {
          if (result) {
            this.navigateToBandProfile(true, result.bandId);
          }
        });
      } else {
        this.bandService.create(form).subscribe((result) => {
          if (result) {
            this.navigateToBandProfile(false, result.bandId);
          }
        });
      }
    }
  }

  private setFormGroupValues(band: BandProfile): void {
    this.bandInfoFormGroup.get('name')?.setValue(band.bandInfo.name);
    this.bandInfoFormGroup
      .get('description')
      ?.setValue(band.bandInfo.description);
    this.bandInfoFormGroup.get('country')?.setValue(band.bandInfo.country);
    this.bandInfoFormGroup.get('state')?.setValue(band.bandInfo.state);
    this.bandInfoFormGroup.get('city')?.setValue(band.bandInfo.city);
    this.bandInfoFormGroup
      .get('phoneNumber')
      ?.setValue(band.bandContactInfo.phoneNumber);
    this.bandInfoFormGroup
      .get('webSite')
      ?.setValue(band.bandContactInfo.webSite);
    this.bandInfoFormGroup
      .get('socialMedia')
      ?.setValue(band.bandContactInfo.socialMedia);
    this.bandInfoFormGroup.get('bandGenres')?.setValue(band.bandGenres);

    this.profileImageformGroup
      .get('bandProfileImage')
      ?.setValue(this.fileConverterPipe.transform(band.bandProfileImage));
  }

  private navigateToBandProfile(edition: boolean, bandId: number): void {
    this.router.navigateByUrl(`band/profile/${bandId}`).then(() => {
      window.location.reload();
      this._logMessageService.logConfirm(
        edition ? 'Banda editada exitosamente!' : '¡Banda creada exitosamente!'
      );
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
