import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../models/image.interface';

@Pipe({
  name: 'convertImageToFile',
  standalone: true,
})
export class ConvertImageToFilePipe implements PipeTransform {
  transform(image: Image): File {
    const base64String = image.picByte;
    const contentType = image.type;
    const fileName = image.name;

    const blob = this.convertToBlob(base64String, contentType);
    return new File([blob], fileName, { type: contentType });
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
}
