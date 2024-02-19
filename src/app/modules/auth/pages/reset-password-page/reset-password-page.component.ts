import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { LogMessageService } from 'src/app/core/services/log-message.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent {
  token!: string;
  loading: boolean = false;
  resetForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'repeatPassword'
        ),
      ],
    }
  );

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private logMessageService: LogMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.loading = true;
      this.resetForm.disable();
      const resetPassword = {
        token: this.token,
        newPassword: this.resetForm.get('password')?.value,
      };

      this.authService.resetPassword(resetPassword).subscribe((result) => {
        this.loading = false;
        if (result) {
          this.logMessageService.logConfirm(
            '¡Contraseña actualizada correctamente!'
          );
          this.router.navigateByUrl('/auth/login');
        } else {
          this.logMessageService.logServerError(
            'Hubo un error con el servidor. Por favor inténtelo de nuevo más tarde.'
          );
        }
      });
    }
  }
}
