import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import { InstrumentFormComponent } from './pages/instrument-form/instrument-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreationFormComponent
  },
  {
    path: 'add-instruments',
    component: InstrumentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCreationRoutingModule { }
