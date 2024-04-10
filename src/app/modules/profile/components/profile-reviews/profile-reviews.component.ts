import {
  Component,
  Input,
  inject,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { Comment } from 'src/app/core/models/comment.interface';
import { ReviewComponent } from './review/review.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { NgIf, NgFor } from '@angular/common';
import { AddAdvertisementDialogComponent } from './add-advertisement-dialog/add-advertisement-dialog.component';
import { Band } from 'src/app/modules/band/models/band.interface';
import { ProfileService } from '../../services/profile.service';
import { BandService } from 'src/app/modules/band/services/band.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
  standalone: true,
  imports: [NgIf, ButtonComponent, NgFor, ReviewComponent],
})
export class ProfileReviewsComponent implements OnInit {
  @Input() userId!: number;
  @Input() band!: Band;
  @Input() isMusicianProfile: boolean = true;

  @Output() onPostChange = new EventEmitter<void>();

  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private musicianProfileService = inject(ProfileService);
  private bandProfileService = inject(BandService);

  user = this.authService.currentUser();
  comments: Comment[] = [];

  ngOnInit(): void {
    if (this.isMusicianProfile) {
      this.musicianProfileService
        .getComments(this.userId)
        .subscribe((result) => (this.comments = result));
    } else {
      this.bandProfileService
        .getComments(this.userId)
        .subscribe((result) => (this.comments = result));
    }
  }

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '700px',
      height: '300px',
      disableClose: true,
      data: {
        isMusicianProfile: this.isMusicianProfile,
        bandId: this.band?.id,
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
      data: { userId: this.userId, bandId: this.band?.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.comments = [];
        this.comments = result;
      }
    });
  }

  openAdvertisementDialog(): void {
    this.dialog.open(AddAdvertisementDialogComponent, {
      width: '700px',
      height: '400px',
      disableClose: true,
      data: this.band.id,
    });
  }
}
