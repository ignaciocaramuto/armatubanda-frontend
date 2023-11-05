import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeImagePipe } from '../../pipes/sanitize-image.pipe';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [CommonModule, SanitizeImagePipe],
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageComponent {
  @Input() picByte?: string;
  @Input() type?: string;
  @Input() class: string = '';
}
