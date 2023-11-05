import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';
import { ProfileService } from '../../services/profile.service';
import { Review } from 'src/app/core/models/review.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userId!: number;
  user!: Musician;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => (this.userId = params['id'])
    );
    this.profileService.getById(this.userId).subscribe((res) => {
      this.user = res;
      this.reviews = this.user.reviews ?? [];
    });
  }
}
