import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MusicianBands } from 'src/app/core/models/musicianBands.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../../../services/profile.service';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { InvitationRequest } from '../../../models/invitation.interface';

@Component({
  selector: 'app-invite-to-band-dialog',
  standalone: true,
  imports: [
    NgFor,
    DialogComponent,
    ProfileImageComponent,
    MatListModule,
    FormsModule,
  ],
  templateUrl: './invite-to-band-dialog.component.html',
  styleUrls: ['./invite-to-band-dialog.component.scss'],
})
export class InviteToBandDialogComponent {
  selectedBands: MusicianBands[] = [];
  selectedBandId!: number;
  bands = inject(MAT_DIALOG_DATA);

  confirmBandInvitation(): void {
    this.selectedBandId = this.selectedBands[0].bandId;
  }
}
