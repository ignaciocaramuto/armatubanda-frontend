import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends FormControlValueAccessorConnector {
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() class: string = 'default-input';
  @Input() invalidErrorMessage: string = '';
  @Input() requiredErrorMessage: string = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() width!: number;

  constructor(injector: Injector) {
    super(injector);
  }
}
