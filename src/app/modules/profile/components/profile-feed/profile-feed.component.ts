import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostComponent } from './post/post.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
  standalone: true,
  imports: [NgFor, PostComponent],
})
export class ProfileFeedComponent {
  @Input() posts: Post[] = [];
}
