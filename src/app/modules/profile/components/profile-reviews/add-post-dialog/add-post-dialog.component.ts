import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropComponent } from 'src/app/core/components/drag-and-drop/drag-and-drop.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';

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
  public formGroup: FormGroup = this.fb.group({
    urlPost: [],
    urlVideo: [],
    image: [],
  });

  addPost(): void {
    if (this.formGroup.valid) {
      if (this.formGroup.get('urlVideo')?.value) {
        this.formGroup.setValue({
          urlPost: true,
          urlVideo: this.formGroup.get('urlVideo')?.value,
          image: null,
        });
      }
      this.profileService
        .addPost(this.formGroup.value)
        .subscribe((res) => console.log(res));
    }
  }
}
