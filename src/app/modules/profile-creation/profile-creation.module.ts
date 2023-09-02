import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileCreationRoutingModule } from './profile-creation-routing.module';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { InstrumentFormComponent } from './pages/instrument-form/instrument-form.component';

@NgModule({
  declarations: [CreationFormComponent, InstrumentFormComponent],
  imports: [
    CommonModule,
    ProfileCreationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProfileCreationModule {}