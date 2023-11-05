import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { Review } from 'src/app/core/models/review.interface';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
})
export class ProfileReviewsComponent {
  @Input() userId!: number;
  @Input() reviews: Review[] = [];
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  user = this.authService.currentUser();

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '250px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
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
