import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';


const routes: Routes = [
  {
    path: '',
    component: CreationFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCreationRoutingModule { }
