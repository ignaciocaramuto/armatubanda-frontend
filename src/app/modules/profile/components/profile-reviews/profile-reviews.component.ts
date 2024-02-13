import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { Review } from 'src/app/core/models/review.interface';
import { ReviewComponent } from './review/review.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NgIf, NgFor } from '@angular/common';
import { BandProfile } from 'src/app/modules/band/models/bandProfile.interface';
import { AddAdvertisementDialogComponent } from './add-advertisement-dialog/add-advertisement-dialog.component';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
  standalone: true,
  imports: [NgIf, ButtonComponent, NgFor, ReviewComponent],
})
export class ProfileReviewsComponent {
  @Input() userId!: number;
  @Input() reviews: Review[] = [];
  @Input() band!: BandProfile;
  @Input() isMusicianProfile: boolean = true;

  @Output() onPostChange = new EventEmitter<void>();

  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  user = this.authService.currentUser();

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '700px',
      height: '605px',
      disableClose: true,
      data: {
        isMusicianProfile: this.isMusicianProfile,
        bandId: this.band?.bandId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onPostChange.emit();
      }
    });
  }

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: { userId: this.userId, bandId: this.band?.bandId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reviews = [];
        this.reviews = result;
      }
    });
  }

  openAdvertisementDialog(): void {
    this.dialog.open(AddAdvertisementDialogComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: this.band.bandId,
    });
  }
}
