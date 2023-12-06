import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessorConnector } from 'src/app/core/components/form-control-value-accessor-connector/form-control-value-accessor-connector';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InfoCardComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent extends FormControlValueAccessorConnector {
  @Input() isEdit: boolean = true;

  constructor(injector: Injector) {
    super(injector);
  }
}
