import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [DialogComponent, InputTextComponent, ReactiveFormsModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
})
export class ResetPasswordDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  private dialogRef = inject(MatDialogRef<ResetPasswordDialogComponent>);
  private authService = inject(AuthService);

  resetPassword(): void {
    if (this.email.valid && this.email.value) {
      this.authService
        .resetPasswordRequest(this.email.value)
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close(true);
          }
        });
    }
  }
}
