import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  exports: [ButtonComponent, FormsModule, ReactiveFormsModule, MatSelectModule],
})
export class SharedModule {}
