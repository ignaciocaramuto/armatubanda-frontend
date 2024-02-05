import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { ProfileFeedComponent } from 'src/app/modules/profile/components/profile-feed/profile-feed.component';
import { ProfileReviewsComponent } from 'src/app/modules/profile/components/profile-reviews/profile-reviews.component';
import { Band } from '../../models/band.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { BandService } from '../../services/band.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BandProfile } from '../../models/bandProfile.interface';
import { Post } from 'src/app/modules/profile/models/post.interface';
import { Review } from 'src/app/core/models/review.interface';

@Component({
  selector: 'app-band-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileResumeComponent,
    ProfileFeedComponent,
    ProfileReviewsComponent,
    MatDialogModule,
  ],
  templateUrl: './band-profile.component.html',
  styleUrls: ['./band-profile.component.scss'],
})
export class BandProfileComponent implements OnInit {
  bandId!: number;
  band!: BandProfile;
  posts: Post[] = [];
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bandId = params['id'];
      this.getById();
      this.getPosts();
    });
  }

  getById(): void {
    this.bandService.getById(this.bandId).subscribe((res) => {
      this.band = res;
      this.reviews = this.band.reviewsList ?? [];
    });
  }

  getPosts(): void {
    this.bandService
      .getPosts(this.bandId)
      .subscribe((result: Post[]) => (this.posts = result));
  }
}
