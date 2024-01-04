import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlValueAccessorConnector } from 'src/app/core/components/form-control-value-accessor-connector/form-control-value-accessor-connector';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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
    standalone: true,
    imports: [
        MatCardModule,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class InfoCardComponent extends FormControlValueAccessorConnector {
  @Input() isEdit: boolean = true;

  constructor(injector: Injector) {
    super(injector);
  }
}
