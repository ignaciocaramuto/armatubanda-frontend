import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostComponent } from './post/post.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
  standalone: true,
  imports: [NgFor, PostComponent, NgIf],
})
export class ProfileFeedComponent {
  @Input() posts: Post[] = [];
  @Input() userId!: number;
  @Input() bandId!: number;
  @Output() postDeleted = new EventEmitter<void>();
}
