import { Component, Input } from '@angular/core';
import { Review } from 'src/app/core/models/review.interface';
import { ProfileImageComponent } from '../../../../../core/components/profile-image/profile-image.component';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    standalone: true,
    imports: [ProfileImageComponent],
})
export class ReviewComponent {
  @Input() review!: Review;
}
