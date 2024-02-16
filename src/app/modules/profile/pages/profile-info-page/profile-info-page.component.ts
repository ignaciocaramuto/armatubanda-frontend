import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfileInfo } from 'src/app/core/models/profileInfo.interface';
import { TranslateExperienceTypePipe } from '../../../../core/pipes/translate-experience-type.pipe';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TranslateExperienceTypePipe],
})
export class ProfileInfoPageComponent implements OnInit {
  isEdit: boolean = false;
  profileInfo!: ProfileInfo;
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.profileService.getProfileInfo(params['id']).subscribe((result) => {
        this.profileInfo = result;
      });
    });
  }
}
