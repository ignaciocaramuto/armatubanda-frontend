import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeImage',
  standalone: true,
})
export class SanitizeImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(base64String?: string, type?: string): SafeUrl {
    const imageUrl = `data:${type};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
