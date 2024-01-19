import {
  Component,
  Input,
  Output,
  inject,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnChanges {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() returnsData: boolean = false;
  @Input() dataToReturn: any;
  @Output() confirmDialog = new EventEmitter<any>();

  private dialogRef = inject(MatDialogRef<DialogComponent>);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToReturn']?.currentValue) {
      this.dialogRef.close(changes['dataToReturn']?.currentValue);
    }
  }

  onConfirmDialog(): void {
    this.confirmDialog.emit();
    if (!this.returnsData) {
      this.dialogRef.close();
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}
