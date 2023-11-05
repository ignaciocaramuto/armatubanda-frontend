import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DialogComponent],
})
export class AddPostDialogComponent {}
