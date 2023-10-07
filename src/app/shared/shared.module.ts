import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizeImagePipe } from '../core/pipes/sanitize-image.pipe';

@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule, SanitizeImagePipe],
  exports: [FormsModule, ReactiveFormsModule, SanitizeImagePipe],
})
export class SharedModule {}
