import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ProfileInfo } from 'src/app/core/models/profileInfo.interface';
import { TranslateExperienceTypePipe } from '../../../../core/pipes/translate-experience-type.pipe';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { ButtonComponent } from 'src/app/core/components/button/button.component';

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    TranslateExperienceTypePipe,
    ButtonComponent,
    RouterLink,
  ],
})
export class ProfileInfoPageComponent implements OnInit {
  isEdit: boolean = false;
  profileInfo!: ProfileInfo;
  userId!: number;
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.profileService.getProfileInfo(params['id']).subscribe((result) => {
        this.profileInfo = result;
      });
    });
  }
}
