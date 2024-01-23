import { Component, Input, OnInit, inject } from '@angular/core';
import { Post } from '../../models/post.interface';
import { ProfileService } from '../../services/profile.service';
import { PostComponent } from './post/post.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
  standalone: true,
  imports: [NgFor, PostComponent],
})
export class ProfileFeedComponent implements OnInit {
  @Input() userId!: number;
  @Input() isMusician: boolean = true;

  posts: Post[] = [];

  private profileService = inject(ProfileService);

  ngOnInit(): void {
    if (this.isMusician) {
      this.profileService
        .getPosts(this.userId)
        .subscribe((result: Post[]) => (this.posts = result));
    } else {
    }
  }
}
