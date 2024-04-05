import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageComponent {
  @Input() imagePath?: string;
  @Input() class: string = '';

  readonly apiUrl = environment.apiUrl;
}
