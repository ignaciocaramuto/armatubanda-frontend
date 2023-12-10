import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { DndDirective } from '../../directives/dnd.directive';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DndDirective],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragAndDropComponent {
  @Output() fileSelected = new EventEmitter<Event>();

  onFileSelected(event: Event): void {
    this.fileSelected.emit(event);
  }
}
