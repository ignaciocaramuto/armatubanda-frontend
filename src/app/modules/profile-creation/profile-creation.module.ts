import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCreationRoutingModule } from './profile-creation-routing.module';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import { InstrumentFormComponent } from './pages/instrument-form/instrument-form.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';

@NgModule({
  declarations: [CreationFormComponent, InstrumentFormComponent],
  imports: [
    CommonModule,
    ProfileCreationRoutingModule,
    MatSelectModule,
    SharedModule,
    InputSelectComponent,
  ],
})
export class ProfileCreationModule {}
