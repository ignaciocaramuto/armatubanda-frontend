import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoPageComponent implements OnInit {
  isEdit: boolean = false;
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  public formGroup: FormGroup = this.fb.group({
    personalInformation: [],
    contactInformation: [],
    skillsInformation: [],
    educationInformation: [],
    careerInformation: [],
    biographyInformation: [],
    preferenceInformation: [],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.profileService
        .getProfileInfo(params['id'])
        .subscribe((result) => console.log(result));
    });
  }
}
