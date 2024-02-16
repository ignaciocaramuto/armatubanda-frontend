import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-input-select',
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSelectComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent extends FormControlValueAccessorConnector {
  @Input() items: any[] = [];
  @Input() idPropertyName: string = 'id';
  @Input() namePropertyName: string = 'name';
  @Input() propToReturn: string = 'name';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;
  @Input() class: string = 'default-input';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() width!: number;

  constructor(injector: Injector) {
    super(injector);
  }
}
