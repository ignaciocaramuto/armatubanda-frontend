import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { Post } from '../../../models/post.interface';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogComponent,
    MatTabsModule,
    MatIconModule,
    DragAndDropComponent,
    InputTextComponent,
    ReactiveFormsModule,
  ],
})
export class AddPostDialogComponent {
  @Input() userId!: number;
  @Output() posts = new EventEmitter<Post[]>();

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  formGroup: FormGroup = this.fb.group({
    urlVideo: [],
    image: [],
  });

  addPost(): void {
    if (this.formGroup.valid) {
      const formData = new FormData();
      if (this.formGroup.get('urlVideo')?.value) {
        formData.append('videoUrl', this.formGroup.get('urlVideo')?.value);
      } else if (this.formGroup.get('image')?.value) {
        formData.append('image', this.formGroup.get('image')?.value);
      }
      this.profileService.addPost(formData).subscribe((res) => {
        if (res) {
          window.location.reload();
        }
      });
    }
  }

  setSelectedFile(event: any): void {
    this.formGroup.get('image')?.setValue(event?.target.files[0]);
  }
}
