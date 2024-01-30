import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { Review } from 'src/app/core/models/review.interface';
import { ReviewComponent } from './review/review.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NgIf, NgFor } from '@angular/common';
import { Band } from 'src/app/modules/band/models/band.interface';

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
  @Input() band!: Band;
  @Input() isMusicianProfile: boolean = true;
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  user = this.authService.currentUser();

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '600px',
      height: '520px',
      disableClose: true,
      data: this.isMusicianProfile,
    });
    dialogRef.afterClosed().subscribe(() => {
      // TODO: if isMusicianProfile emit event to get musician posts
      // TODO: if !isMusicianProfile emit event to get band posts
    });
  }

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: { userId: this.userId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reviews = result;
      }
    });
  }
}
