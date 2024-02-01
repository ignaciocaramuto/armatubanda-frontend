import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { BandProfile } from '../../models/bandProfile.interface';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  standalone: true,
  imports: [
    ProfileImageComponent,
    ProfileResumeComponent,
    MatCardModule,
    MatButtonModule,
    NgFor,
  ],
})
export class RequestsComponent {
  band!: BandProfile;
}
