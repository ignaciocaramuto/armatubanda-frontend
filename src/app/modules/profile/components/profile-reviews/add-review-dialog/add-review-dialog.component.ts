import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { BandService } from 'src/app/modules/band/services/band.service';
import { Comment } from 'src/app/core/models/comment.interface.js';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ProfileImageComponent,
    DialogComponent,
  ],
})
export class AddReviewDialogComponent {
  private _authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<AddReviewDialogComponent>);
  private profileService = inject(ProfileService);
  private bandService = inject(BandService);
  private dialogData = inject(MAT_DIALOG_DATA);

  user = this._authService.currentUser();

  formReview = new FormControl('', [
    Validators.required,
    Validators.maxLength(200),
  ]);

  postReview(): void {
    if (this.formReview.valid && this.formReview.value) {
      if (this.dialogData.bandId) {
        const comment = {
          comment: this.formReview.value,
          author: this.user()!.id,
          band: this.dialogData.bandId,
        };

        this.bandService.postReview(comment).subscribe((comments) => {
          this.dialogRef.close(comments);
        });
      } else {
        const comment = this.formReview.value;
        this.profileService
          .leaveComment(this.dialogData.userId, comment)
          .subscribe((comments) => {
            this.dialogRef.close(comments);
          });
      }
    }
  }
}
