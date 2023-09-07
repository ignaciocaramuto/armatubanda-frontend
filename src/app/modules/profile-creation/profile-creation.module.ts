import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCreationRoutingModule } from './profile-creation-routing.module';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import { InstrumentFormComponent } from './pages/instrument-form/instrument-form.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [CreationFormComponent, InstrumentFormComponent],
  imports: [
    CommonModule,
    ProfileCreationRoutingModule,
    MatSelectModule,
    SharedModule,
    InputSelectComponent,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
  ],
})
export class ProfileCreationModule {}
