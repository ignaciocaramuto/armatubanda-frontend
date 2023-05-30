import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

// Primeng
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class SharedModule { }
