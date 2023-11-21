import { Component, Injector, Input } from '@angular/core';
import { FormControlValueAccessorConnector } from 'src/app/core/components/form-control-value-accessor-connector/form-control-value-accessor-connector';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent extends FormControlValueAccessorConnector {
  @Input() isEdit: boolean = true;
  constructor(injector: Injector) {
    super(injector);
  }
}
