import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/core/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public registerForm: FormGroup = this.fb.group(
    {
      email: ['martin@gmail.com', [Validators.required, Validators.email]],
      password: ['asdasd123', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [
        'asdasd123',
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

  constructor() {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, repeatPassword } = this.registerForm.value;

      this.authService.register(email, password).subscribe({
        next: () => this.router.navigateByUrl('/list'),
        error: (error) => {
          console.log({ registerError: error });
        },
      });
    } else {
      // Handle form validation errors
      console.log('Invalid form');
    }
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.registerForm, field);
  }
}
