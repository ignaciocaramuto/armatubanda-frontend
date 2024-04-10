import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApplicationService } from 'src/app/modules/band/services/application.service';

@Component({
  selector: 'app-add-application-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-application-dialog.component.html',
  styleUrls: ['./add-application-dialog.component.scss'],
})
export class AddApplicationDialogComponent {
  private dialogRef = inject(MatDialogRef<AddApplicationDialogComponent>);
  private applicationService = inject(ApplicationService);
  private fb = inject(FormBuilder);
  adId = inject(MAT_DIALOG_DATA);

  applicationFormGroup = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(200)]],
  });

  confirmApplication(): void {
    if (!this.applicationFormGroup.valid) {
      return;
    }

    this.applicationService
      .createApplication(this.adId, this.applicationFormGroup.value)
      .subscribe((result) => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
  }
}
