import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { InputTextComponent } from '../../../../core/components/input-text/input-text.component';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    NgIf,
    MatProgressSpinnerModule,
  ],
})
export class RegisterPageComponent {
  userCreated: boolean = false;
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private logMessageService = inject(LogMessageService);

  public registerForm: FormGroup = this.fb.group(
    {
      email: [
        { value: '', disabled: this.loading },
        [Validators.required, Validators.email],
      ],
      password: [
        { value: '', disabled: this.loading },
        [Validators.required, Validators.minLength(6)],
      ],
      repeatPassword: [
        { value: '', disabled: this.loading },
        [Validators.required, Validators.minLength(6)],
      ],
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password } = this.registerForm.value;

      this.authService.register(email, password).subscribe((result) => {
        if (result) {
          this.userCreated = true;
          this.loading = false;
        }
      });
    } else {
      this.logMessageService.logServerError(
        'Por favor completa los campos requeridos.'
      );
    }
  }
}
