import { Component, Input, inject } from '@angular/core';
import {
  BiographyInformation,
  ContactInformation,
  PersonalInformation,
} from 'src/app/core/models/musician';
import { Image } from 'src/app/core/models/image.interface';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProfileImageComponent } from '../../../../core/components/profile-image/profile-image.component';
import { BandInfo } from 'src/app/modules/band/models/band.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-resume',
  templateUrl: './profile-resume.component.html',
  styleUrls: ['./profile-resume.component.scss'],
  standalone: true,
  imports: [ProfileImageComponent, ButtonComponent, NgIf],
})
export class ProfileResumeComponent {
  @Input() biographyInfo!: BiographyInformation;
  @Input() contactInfo!: ContactInformation;
  @Input() personalInfo!: PersonalInformation;
  @Input() profileImage?: Image;
  @Input() userId!: number;
  @Input() bandInfo!: BandInfo;
  @Input() isMusicianProfile: boolean = true;

  private router = inject(Router);

  redirectToUserWebsite(): void {
    window.open(this.contactInfo.webSite, '_blank');
  }

  goToInfo(): void {
    this.router.navigateByUrl(`profile/info/${this.userId}`);
  }
}
