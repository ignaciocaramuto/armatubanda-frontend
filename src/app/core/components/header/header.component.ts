import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  effect,
} from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { MatDividerModule } from '@angular/material/divider';
import { MusicianBands } from '../../models/musicianBands.interface';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { InvitationService } from 'src/app/modules/profile/services/invitation.service';
import { forkJoin } from 'rxjs';
import { Invitation } from 'src/app/modules/profile/models/invitation.interface';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ProfileImageComponent,
    MatDividerModule,
    MatBadgeModule,
  ],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  profileService = inject(ProfileService);
  invitationService = inject(InvitationService);
  cd = inject(ChangeDetectorRef);
  user = this.authService.currentUser();
  status = this.authService.authStatus();
  musicianBands: MusicianBands[] = [];
  invitations: Invitation[] = [];

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe();
    this.authService.user$.subscribe(() => {
      if (!this.user()?.id) {
        this.musicianBands = [];
        this.invitations = [];
        return;
      }

      forkJoin({
        musicianBands: this.profileService.getMusicianBands(this.user()!.id),
        invitations: this.invitationService.getPendingInvitations(),
      }).subscribe(({ musicianBands, invitations }) => {
        this.musicianBands = musicianBands;
        this.invitations = invitations;
        this.cd.detectChanges();
      });
    });
  }
}
