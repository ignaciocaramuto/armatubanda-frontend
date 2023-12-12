import { Component, Input, OnInit, inject } from '@angular/core';
import { Post } from '../../models/post.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  @Input() userId!: number;

  posts: Post[] = [];

  private profileService = inject(ProfileService);

  ngOnInit(): void {
    this.profileService
      .getPosts(this.userId)
      .subscribe((result: Post[]) => (this.posts = result));
  }
}
