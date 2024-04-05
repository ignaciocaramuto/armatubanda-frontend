import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';
import { ProfileService } from '../../services/profile.service';
import { ProfileReviewsComponent } from '../../components/profile-reviews/profile-reviews.component';
import { ProfileFeedComponent } from '../../components/profile-feed/profile-feed.component';
import { ProfileResumeComponent } from '../../components/profile-resume/profile-resume.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { Post } from '../../models/post.interface';
import { Comment } from 'src/app/core/models/comment.interface.js';

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
  musicianId!: number;
  musician!: Musician;
  comments: Comment[] = [];
  posts: Post[] = [];
  genres: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.musicianId = params['id'];
      this.getById();
      this.getPosts();
    });
  }

  getById(): void {
    this.profileService.getById(this.musicianId).subscribe((res) => {
      this.musician = res;
      this.genres = this.musician.genres.map((genre) => genre.name);
      this.comments = this.musician.comments ?? [];
    });
  }

  getPosts(): void {
    this.profileService
      .getPosts(this.musicianId)
      .subscribe((result: Post[]) => (this.posts = result));
  }
}
