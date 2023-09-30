import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss'],
})
export class ProfileReviewsComponent {
  reviews = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
