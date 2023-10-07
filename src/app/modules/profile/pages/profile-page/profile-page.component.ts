import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userId!: number;
  user!: Musician;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => (this.userId = params['id'])
    );
    this.profileService
      .getMusician(this.userId)
      .subscribe((res) => (this.user = res));
  }
}
