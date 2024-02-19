import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [DialogComponent, InputTextComponent, ReactiveFormsModule],
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
})
export class ResetPasswordDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
}
