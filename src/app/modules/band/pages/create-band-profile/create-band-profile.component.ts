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
import { Router } from '@angular/router';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { Genre } from 'src/app/core/models/genre.interface';
import { GenreService } from 'src/app/core/services/genre.service';

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
})
export class CreateBandProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private user = this.authService.currentUser();
  private bandService = inject(BandService);
  private router = inject(Router);
  private genreService = inject(GenreService);

  genres: Genre[] = [];

  bandInfoFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    phoneNumber: [''],
    webSite: [''],
    socialMedia: [''],
    bandGenres: ['', Validators.required],
  });

  profileImageformGroup: FormGroup = this.fb.group({
    bandProfileImage: [],
  });

  ngOnInit(): void {
    this.genreService.getAll().subscribe((result) => (this.genres = result));
  }

  setSelectedFile(event: any) {
    this.profileImageformGroup
      .get('bandProfileImage')
      ?.setValue(event?.target.files[0]);
  }

  onSubmit(): void {
    if (this.bandInfoFormGroup.valid && this.profileImageformGroup.valid) {
      const band = {
        bandInfo: {
          name: this.bandInfoFormGroup.get('name')?.value,
          description: this.bandInfoFormGroup.get('description')?.value,
          country: this.bandInfoFormGroup.get('country')?.value,
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

      console.log(band);

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

      this.bandService
        .create(form)
        .subscribe((result) =>
          this.router.navigateByUrl(`../profile/${result.id}`)
        );
    }
  }
}
