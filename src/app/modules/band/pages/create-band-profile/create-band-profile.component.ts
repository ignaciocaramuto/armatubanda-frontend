import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';

@Component({
  selector: 'app-create-band-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    InputTextComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './create-band-profile.component.html',
  styleUrls: ['./create-band-profile.component.scss'],
})
export class CreateBandProfileComponent {
  private fb = inject(FormBuilder);

  bandInfoFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    webSite: ['', Validators.required],
    socialMedia: ['', Validators.required],
    creationDate: ['', Validators.required],
  });
}
