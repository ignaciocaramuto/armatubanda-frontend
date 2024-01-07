import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { ProfileFeedComponent } from 'src/app/modules/profile/components/profile-feed/profile-feed.component';
import { ProfileReviewsComponent } from 'src/app/modules/profile/components/profile-reviews/profile-reviews.component';
import { Band } from '../../models/band.interface';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-band-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileResumeComponent,
    ProfileFeedComponent,
    ProfileReviewsComponent,
    MatDialogModule,
  ],
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss'],
})
export class BandProfileComponent {
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
