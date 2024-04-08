import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/core/services/post.service';

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
  private postService = inject(PostService);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddPostDialogComponent>);

  formGroup: FormGroup = this.fb.group({
    videoUrl: [],
  });

  addPost(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const post = {
      videoUrl: this.formGroup.get('videoUrl')!.value,
    };

    if (this.data.isMusicianProfile) {
      this.postService.createForMusician(post).subscribe((result) => {
        if (result) {
          this.dialogRef.close(true);
        }
      });
    } else {
      this.postService
        .createForBand(post, this.data.bandId)
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close(true);
          }
        });
    }
  }
}
