import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { DndDirective } from '../../directives/dnd.directive';
import { Image } from '../../models/image.interface';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DndDirective],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragAndDropComponent implements OnInit {
  @Input() image!: Image | undefined;
  @Output() fileSelected = new EventEmitter<Event>();

  imageSrc!: string | ArrayBuffer | null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.image) {
      this.convertObjectToBlobAndShowPreview(this.image);
    }
  }

  onFileSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.readURL(event.target.files[0]);
    }
    this.fileSelected.emit(event);
  }

  private readURL(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  private convertToBlob(base64String: string, contentType: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  private convertObjectToBlobAndShowPreview(image: Image) {
    const base64String = image.picByte;
    const contentType = image.type;
    const fileName = image.name;

    const blob = this.convertToBlob(base64String, contentType);
    this.readURL(new File([blob], fileName, { type: contentType }));
  }
}
