import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private isMusicianProfile = inject(MAT_DIALOG_DATA);

  formGroup: FormGroup = this.fb.group({
    urlVideo: [],
    image: [],
  });

  addPost(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const formData = new FormData();
    if (this.formGroup.get('urlVideo')?.value) {
      formData.append('videoUrl', this.formGroup.get('urlVideo')?.value);
    } else if (this.formGroup.get('image')?.value) {
      formData.append('image', this.formGroup.get('image')?.value);
    }

    if (this.isMusicianProfile) {
      this.profileService.addPost(formData).subscribe((res) => {
        // TODO: reload posts
      });
    } else {
      // TODO: Post for bands
    }
  }

  setSelectedFile(event: any): void {
    this.formGroup.get('image')?.setValue(event?.target.files[0]);
  }
}
