import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileInfoPageComponent } from './pages/profile-info-page/profile-info-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProfilePageComponent,
  },
  {
    path: 'info/:id',
    component: ProfileInfoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
