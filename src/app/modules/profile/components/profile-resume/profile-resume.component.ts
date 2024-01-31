import { Component, Input, OnInit, inject } from '@angular/core';
import {
  BiographyInformation,
  ContactInformation,
  PersonalInformation,
} from 'src/app/core/models/musician';
import { Image } from 'src/app/core/models/image.interface';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProfileImageComponent } from '../../../../core/components/profile-image/profile-image.component';
import { BandInfo } from 'src/app/modules/band/models/band.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InviteToBandDialogComponent } from './invite-to-band-dialog/invite-to-band-dialog.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { InvitationService } from '../../services/invitation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../services/profile.service';
import { InvitationRequest } from '../../models/invitation.interface';
import { MusicianBandsStatus } from 'src/app/core/models/musicianBandsStatus.interface';
import { MusicianStatusBand } from 'src/app/core/enums/musicianStatusBand.enum';
import { BandMember } from 'src/app/modules/band/models/bandProfile.interface';

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
    NgFor,
    RouterModule,
  ],
})
export class ProfileResumeComponent implements OnInit {
  @Input() biographyInfo!: BiographyInformation;
  @Input() contactInfo!: ContactInformation;
  @Input() personalInfo!: PersonalInformation;
  @Input() profileImage?: Image;
  @Input() userId!: number;
  @Input() bandInfo!: BandInfo;
  @Input() leaderProfileImage!: Image;
  @Input() members: BandMember[] = [];
  @Input() isMusicianProfile: boolean = true;

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private invitationService = inject(InvitationService);
  private musicianService = inject(ProfileService);
  user = this.authService.currentUser();
  hasBeenInvitedToAllBands: boolean = false;
  isMemberOfAllBands: boolean = false;
  bands: MusicianBandsStatus[] = [];
  profileBandsMember: MusicianBandsStatus[] = [];

  ngOnInit(): void {
    this.musicianService
      .getMusicianLeaderBands(this.user()?.id)
      .subscribe((result) => {
        this.bands = result;
        this.hasBeenInvitedToAllBands = this.bands.every(
          ({ status }) => status === MusicianStatusBand.Pending
        );
        this.isMemberOfAllBands = this.bands.every(
          ({ status }) => status === MusicianStatusBand.Member
        );
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
