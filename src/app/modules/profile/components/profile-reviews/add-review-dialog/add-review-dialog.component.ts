import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SanitizeImagePipe } from '../../../../../core/pipes/sanitize-image.pipe';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';

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
  private authService = inject(AuthService);
  user = this.authService.currentUser();

  formReview = new FormControl('', [
    Validators.required,
    Validators.maxLength(200),
  ]);
  constructor(public dialogRef: MatDialogRef<AddReviewDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
