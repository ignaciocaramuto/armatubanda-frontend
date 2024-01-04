import { Routes } from '@angular/router';
import { ProfileInfoPageComponent } from './pages/profile-info-page/profile-info-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':id',
    component: ProfilePageComponent,
  },
  {
    path: 'info/:id',
    component: ProfileInfoPageComponent,
  },
];
