import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProfileImageComponent } from '../../../../../core/components/profile-image/profile-image.component';
import { Comment } from 'src/app/core/models/comment.interface.js';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [ProfileImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  @Input() comment!: Comment;
}
