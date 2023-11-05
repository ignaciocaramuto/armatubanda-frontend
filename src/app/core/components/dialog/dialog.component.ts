import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Output() confirmDialog = new EventEmitter<any>();
  private dialogRef = inject(MatDialogRef<DialogComponent>);

  onConfirmDialog(): void {
    this.confirmDialog.emit();
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
