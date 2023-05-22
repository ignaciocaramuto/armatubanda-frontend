import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      // Handle form validation errors
      console.log('Invalid form');
    }
  }

}
