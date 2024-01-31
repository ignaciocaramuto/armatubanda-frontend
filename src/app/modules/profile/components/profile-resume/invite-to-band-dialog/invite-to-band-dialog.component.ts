import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MusicianStatusBand } from 'src/app/core/enums/musicianStatusBand.enum';
import { MusicianBandsStatus } from 'src/app/core/models/musicianBandsStatus.interface';

@Component({
  selector: 'app-invite-to-band-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DialogComponent,
    ProfileImageComponent,
    MatListModule,
    FormsModule,
  ],
  templateUrl: './invite-to-band-dialog.component.html',
  styleUrls: ['./invite-to-band-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteToBandDialogComponent {
  selectedBands: MusicianBandsStatus[] = [];
  private dialogRef = inject(MatDialogRef<InviteToBandDialogComponent>);
  bands = inject(MAT_DIALOG_DATA);
  readonly MusicianStatusBand = MusicianStatusBand;

  confirmBandInvitation(): void {
    const selectedBandId = this.selectedBands[0].musicianBandsDto.bandId;
    if (selectedBandId) {
      this.dialogRef.close(selectedBandId);
    }
  }
}
