import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss'],
})
export class ProfileInfoPageComponent {
  isEdit: boolean = false;
  private fb = inject(FormBuilder);

  public formGroup: FormGroup = this.fb.group({
    personalInformation: [''],
    contactInformation: [''],
    skillsInformation: [''],
    educationInformation: [''],
    careerInformation: [''],
    biographyInformation: [''],
    preferenceInformation: [''],
  });
}
