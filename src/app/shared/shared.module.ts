import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from './components/button/button.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  exports: [ButtonModule, FormsModule, ReactiveFormsModule, MatSelectModule],
})
export class SharedModule {}
