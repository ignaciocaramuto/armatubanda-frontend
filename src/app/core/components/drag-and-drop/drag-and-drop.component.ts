import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { DndDirective } from '../../directives/dnd.directive';
import { Image } from '../../models/image.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConvertImageToFilePipe } from '../../pipes/convert-image-to-file.pipe';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DndDirective,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  providers: [ConvertImageToFilePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragAndDropComponent implements OnChanges {
  @Input() imagePath!: string | undefined;
  @Output() fileSelected = new EventEmitter<Event | null>();

  imageSrc!: string | ArrayBuffer | null;
  fileName!: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagePath'].currentValue) {
      this.imageSrc = changes['imagePath'].currentValue;
    }
  }

  onFileSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.readURL(event.target.files[0]);
    }
    this.fileSelected.emit(event);
  }

  deleteFile(): void {
    this.imageSrc = null;
    this.fileSelected.emit(null);
  }

  private readURL(file: File): void {
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
