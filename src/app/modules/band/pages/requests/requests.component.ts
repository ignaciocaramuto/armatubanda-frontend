import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { Band } from '../../models/band.interface';

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
  band: Band = {
    id: 1,
    bandInfo: {
      name: 'AC/DC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, quidem, modi dignissimos neque obcaecati dolores magni, molestiae ullam odio consequatur rem incidunt itaque. Praesentium porro ipsam ex, minus enim rem?',
      country: 'Argentina',
      city: 'Rosario',
      creationDate: new Date(),
    },
    bandGenres: [{ id: 1, name: 'Rock' }],
    bandProfileImage: {
      id: 1,
      name: '',
      type: '',
      picByte: '',
    },
    contactInformation: {
      phoneNumber: '',
      webSite: '',
      socialMedia: '',
    },
    leaderName: 'Ignacio',
  };
}
