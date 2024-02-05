import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BandService } from 'src/app/modules/band/services/band.service';

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
  private bandService = inject(BandService);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddPostDialogComponent>);

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

    if (this.data.isMusicianProfile) {
      this.profileService.addPost(formData).subscribe((result) => {
        if (result) {
          this.dialogRef.close(true);
        }
      });
    } else {
      formData.append('bandId', this.data.bandId);
      this.bandService.addPost(formData).subscribe((result) => {
        if (result) {
          this.dialogRef.close(true);
        }
      });
    }
  }

  setSelectedFile(event: any): void {
    this.formGroup.get('image')?.setValue(event?.target.files[0]);
  }
}
