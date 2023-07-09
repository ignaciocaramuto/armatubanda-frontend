import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  public loginForm: FormGroup = this.fb.group({
    email: ['martin@gmail.com',[Validators.required,Validators.email]],
    password: ['asdasd123',[Validators.required,Validators.minLength(6)]]
  });

  constructor() { }

  onSubmit() {
    if (this.loginForm.valid) {

      const {email,password} = this.loginForm.value;

      this.authService.login(email,password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/list'),
        error: (error) => {
          console.log({loginError: error});
        }
      });
    } else {
      // Handle form validation errors
      console.log('Invalid form');
    }
  }

}
