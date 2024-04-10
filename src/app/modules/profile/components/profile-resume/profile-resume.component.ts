import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProfileImageComponent } from '../../../../core/components/profile-image/profile-image.component';
import { Band } from 'src/app/modules/band/models/band.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InviteToBandDialogComponent } from './invite-to-band-dialog/invite-to-band-dialog.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { InvitationService } from '../../services/invitation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../services/profile.service';
import { InvitationRequest } from '../../models/invitation.interface';
import { BandService } from 'src/app/modules/band/services/band.service';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { Musician } from 'src/app/core/models/musician';
import { MusicianBandsStatus } from 'src/app/core/models/musicianBandsStatus.interface';
import { MusicianStatusBand } from 'src/app/core/enums/musicianStatusBand.enum';

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
    TranslateModule,
  ],
})
export class ProfileResumeComponent implements OnChanges {
  @Input() isMusicianProfile: boolean = true;
  @Input() musician?: Musician;
  @Input() band?: Band;
  @Input() currentProfileMusician?: number;

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
  profileBandsMember: Band[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProfileMusician']?.currentValue) {
      const currentProfileMusician =
        changes['currentProfileMusician'].currentValue;
      this.getMusicianLeaders(currentProfileMusician);
      this.getBandsFromMusician(currentProfileMusician);
    }
  }

  redirectToUserWebsite(): void {
    window.open(this.musician!.webSite, '_blank');
  }

  goToInfo(): void {
    this.router.navigateByUrl(`profile/info/${this.musician!.id}`);
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
          musicianId: this.musician!.id,
          bandId: selectedBandId,
        };

        this.invitationService
          .createInvitation(invitation)
          .subscribe((result) => {
            if (result) {
              this.getMusicianLeaders(this.musician!.id);
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
          this.bandService.deleteBand(this.band!.id).subscribe((result) => {
            if (result) {
              this.router.navigateByUrl('/band/list');
            }
          });
        }
      });
  }

  isMember(): boolean {
    return this.band!.members?.some(({ id }) => id === this.user()!.id);
  }

  leaveBand(): void {
    this.musicianService.leaveBand(this.band!.id).subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  private getMusicianLeaders(currentProfileMusician: number): void {
    this.musicianService
      .getMusicianLeaderBands(currentProfileMusician)
      .subscribe((result) => {
        this.bands = result;
        this.hasBeenInvitedToAllBands = this.bands.every(
          ({ status }) => status === MusicianStatusBand.PENDING_INVITATION
        );
        this.isMemberOfAllBands = this.bands.every(
          ({ status }) => status === MusicianStatusBand.MEMBER
        );
      });
  }

  private getBandsFromMusician(userId: number): void {
    this.musicianService.getMusicianBands(userId).subscribe((result) => {
      this.profileBandsMember = result;
      console.log(this.profileBandsMember);
    });
  }
}
