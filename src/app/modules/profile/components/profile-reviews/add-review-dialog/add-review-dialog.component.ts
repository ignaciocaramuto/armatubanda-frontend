import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SanitizeImagePipe } from '../../../../../core/pipes/sanitize-image.pipe';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../../services/profile.service';
import { Review } from 'src/app/core/models/review.interface';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SanitizeImagePipe,
    ButtonComponent,
    MatIconModule,
  ],
})
export class AddReviewDialogComponent {
  private _authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<AddReviewDialogComponent>);
  private profileService = inject(ProfileService);
  private dialogData = inject(MAT_DIALOG_DATA);
  user = this._authService.currentUser();

  formReview = new FormControl('', [
    Validators.required,
    Validators.maxLength(200),
  ]);

  postReview(): void {
    if (this.formReview.valid && this.formReview.value) {
      const review: Review = {
        comment: this.formReview.value,
        reviewerId: this.user()?.id,
        musicianId: this.dialogData.userId,
      };
      this.profileService.postReview(review).subscribe((reviews) => {
        this.dialogRef.close(reviews);
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
