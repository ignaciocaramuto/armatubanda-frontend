import { Component, Input } from '@angular/core';
import {
  BiographyInformation,
  ContactInformation,
  PersonalInformation,
} from 'src/app/core/models/musician';
import { Image } from 'src/app/core/models/image.interface';

@Component({
  selector: 'app-profile-resume',
  templateUrl: './profile-resume.component.html',
  styleUrls: ['./profile-resume.component.scss'],
})
export class ProfileResumeComponent {
  @Input() biographyInfo!: BiographyInformation;
  @Input() contactInfo!: ContactInformation;
  @Input() personalInfo!: PersonalInformation;
  @Input() profileImage?: Image;

  redirectToUserWebsite(): void {
    window.open(this.contactInfo.webSite, '_blank');
  }
}
