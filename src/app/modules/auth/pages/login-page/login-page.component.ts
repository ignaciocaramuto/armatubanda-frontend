import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { ResetPasswordDialogComponent } from '../../components/reset-password-dialog/reset-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    MatProgressSpinnerModule,
    NgIf,
  ],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logMessageService = inject(LogMessageService);
  private dialog = inject(MatDialog);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  loading: boolean = false;

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      this.loginForm.disable();

      this.authService
        .login(email, password)
        .pipe(
          catchError(() => {
            this.loginForm.enable();
            this.loading = false;
            return of(null);
          })
        )
        .subscribe((result) => {
          if (result) {
            this.authService.checkAuthentication().subscribe();
            this.router.navigateByUrl('/list');
          }
        });
    } else {
      this.logMessageService.logServerError(
        'Por favor completa los campos requeridos.'
      );
    }
  }

  openResetPasswordDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '470px',
      height: '300px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logMessageService.logConfirm(
          'Por favor revisa tu correo electrónico para restablecer tu contraseña'
        );
      }
    });
  }
}
