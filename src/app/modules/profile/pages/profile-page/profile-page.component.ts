import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';
import { ProfileService } from '../../services/profile.service';
import { Review } from 'src/app/core/models/review.interface';
import { ProfileReviewsComponent } from '../../components/profile-reviews/profile-reviews.component';
import { ProfileFeedComponent } from '../../components/profile-feed/profile-feed.component';
import { ProfileResumeComponent } from '../../components/profile-resume/profile-resume.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    ProfileResumeComponent,
    ProfileFeedComponent,
    ProfileReviewsComponent,
    MatDialogModule,
    NgIf,
  ],
})
export class ProfilePageComponent implements OnInit {
  userId!: number;
  user!: Musician;
  reviews: Review[] = [];
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getById();
      this.getPosts();
    });
  }

  getById(): void {
    this.profileService.getById(this.userId).subscribe((res) => {
      this.user = res;
      this.reviews = this.user.reviews ?? [];
    });
  }

  getPosts(): void {
    this.profileService
      .getPosts(this.userId)
      .subscribe((result: Post[]) => (this.posts = result));
  }
}
