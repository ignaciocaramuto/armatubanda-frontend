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
import { MusicianBands } from 'src/app/core/models/musicianBands.interface';
import { BandService } from 'src/app/modules/band/services/band.service';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

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
    ConfirmDialogComponent,
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
  @Input() bandId!: number;

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private invitationService = inject(InvitationService);
  private musicianService = inject(ProfileService);
  private bandService = inject(BandService);
  user = this.authService.currentUser();
  hasBeenInvitedToAllBands: boolean = false;
  isMemberOfAllBands: boolean = false;
  bands: MusicianBandsStatus[] = [];
  profileBandsMember: MusicianBands[] = [];

  ngOnInit(): void {
    if (!this.isMusicianProfile) {
      return;
    }

    this.getMusicianLeaders();
    this.getBandsFromMusician();
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
              this.getMusicianLeaders();
            }
          });
      }
    });
  }

  deleteBanda(): void {
    const confirmText = '¿Estás seguro que quieres borrar esta banda?';
    this.dialog
      .open(ConfirmDialogComponent, {
        data: confirmText,
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.bandService.deleteBand(this.bandId).subscribe((result) => {
            if (result) {
              this.router.navigateByUrl('/band/list');
            }
          });
        }
      });
  }

  private getMusicianLeaders(): void {
    this.musicianService
      .getMusicianLeaderBands(this.userId)
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

  private getBandsFromMusician(): void {
    this.musicianService.getMusicianBands(this.userId).subscribe((result) => {
      this.profileBandsMember = result;
    });
  }
}
