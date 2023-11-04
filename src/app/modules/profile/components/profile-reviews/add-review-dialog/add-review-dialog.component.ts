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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { snackbarConfig } from 'src/app/config/snackbar-config';

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
  private _snackBar = inject(MatSnackBar);
  user = this._authService.currentUser();

  formReview = new FormControl('', [
    Validators.required,
    Validators.maxLength(200),
  ]);
  constructor(public dialogRef: MatDialogRef<AddReviewDialogComponent>) {}

  postReview(): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      ...snackbarConfig,
      data: { message: '¡Tu reseña ha sido añadida!' },
      panelClass: ['success-snackbar'],
    });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}