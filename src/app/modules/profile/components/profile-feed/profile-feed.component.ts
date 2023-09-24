import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent {
  posts = [
    'https://www.youtube.com/embed/n_GFN3a0yj0',
    'https://www.youtube.com/embed/pAgnJDJN4VA',
  ];
}
