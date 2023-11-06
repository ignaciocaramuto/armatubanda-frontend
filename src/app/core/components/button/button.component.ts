import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: string = 'button';
  @Input() color: string = 'primary';
  @Input() class: string = 'medium';
  @Input() icon: string = '';
}
