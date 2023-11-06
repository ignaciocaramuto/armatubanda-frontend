import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDnd]',
  standalone: true,
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event'])
  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  ondrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
