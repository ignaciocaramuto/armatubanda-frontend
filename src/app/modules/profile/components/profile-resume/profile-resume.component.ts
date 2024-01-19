import { Component, Input, OnInit, inject } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { InviteToBandDialogComponent } from './invite-to-band-dialog/invite-to-band-dialog.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { InvitationService } from '../../services/invitation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../services/profile.service';
import { MusicianBands } from 'src/app/core/models/musicianBands.interface';
import { InvitationRequest } from '../../models/invitation.interface';

@Component({
  selector: 'app-profile-resume',
  templateUrl: './profile-resume.component.html',
  styleUrls: ['./profile-resume.component.scss'],
  standalone: true,
  imports: [
    ProfileImageComponent,
    ButtonComponent,
    NgIf,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ProfileResumeComponent implements OnInit {
  @Input() biographyInfo!: BiographyInformation;
  @Input() contactInfo!: ContactInformation;
  @Input() personalInfo!: PersonalInformation;
  @Input() profileImage?: Image;
  @Input() userId!: number;
  @Input() bandInfo!: BandInfo;
  @Input() isMusicianProfile: boolean = true;

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private invitationService = inject(InvitationService);
  private musicianService = inject(ProfileService);
  user = this.authService.currentUser();
  hasBeenInvitedToAllBands: boolean = false;
  bands: MusicianBands[] = [];

  ngOnInit(): void {
    this.musicianService
      .getMusicianLeaderBands(this.user()?.id)
      .subscribe((result) => {
        this.bands = result;
        // this.hasBeenInvitedToAllBands = !this.bands.some(({status}) => status === 'No invitado');
      });
  }

  redirectToUserWebsite(): void {
    window.open(this.contactInfo.webSite, '_blank');
  }

  goToInfo(): void {
    this.router.navigateByUrl(`profile/info/${this.userId}`);
  }

  inviteToBand(): void {
    const dialogRef = this.dialog.open(InviteToBandDialogComponent, {
      width: '600px',
      height: '520px',
      disableClose: true,
      data: this.bands,
    });

    dialogRef.afterClosed().subscribe((selectedBandId) => {
      if (selectedBandId) {
        const invitation: InvitationRequest = {
          musicianId: this.userId,
          bandId: selectedBandId,
        };

        this.invitationService
          .createInvitation(invitation)
          .subscribe((result) => {
            if (result) {
              this.hasBeenInvitedToAllBands = true;
            }
          });
      }
    });
  }
}
