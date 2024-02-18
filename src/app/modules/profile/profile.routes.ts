import { Routes } from '@angular/router';
import { ProfileInfoPageComponent } from './pages/profile-info-page/profile-info-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from '../profile-creation/guards/profile-set.guard';
import { emailConfirmedGuard } from '../auth/guards/email-confirmed.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':id',
    component: ProfilePageComponent,
    canActivate: [canActivateGuardProfile, emailConfirmedGuard],
    canMatch: [canMatchGuardProfile],
  },
  {
    path: 'info/:id',
    component: ProfileInfoPageComponent,
    canActivate: [canActivateGuardProfile, emailConfirmedGuard],
    canMatch: [canMatchGuardProfile],
  },
];
