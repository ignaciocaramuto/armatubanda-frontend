import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { ProfileFeedComponent } from 'src/app/modules/profile/components/profile-feed/profile-feed.component';
import { ProfileReviewsComponent } from 'src/app/modules/profile/components/profile-reviews/profile-reviews.component';
import { Band } from '../../models/band.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { BandService } from '../../services/band.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/modules/profile/models/post.interface';
import { Comment } from 'src/app/core/models/comment.interface';
import { PostService } from 'src/app/core/services/post.service';

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
  band!: Band;
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService,
    private postService: PostService
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
    });
  }

  getPosts(): void {
    this.postService
      .getAllFromBand(this.bandId)
      .subscribe((result: Post[]) => (this.posts = result));
  }
}
