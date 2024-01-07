import { Routes } from '@angular/router';
import { RequestsComponent } from './pages/requests/requests.component';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from '../profile-creation/guards/profile-set.guard';
import { BandProfileComponent } from './pages/band-profile/band-profile.component';

export const BAND_ROUTES: Routes = [
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [canActivateGuardProfile],
    canMatch: [canMatchGuardProfile],
  },
  {
    path: 'profile',
    component: BandProfileComponent,
    canActivate: [canActivateGuardProfile],
    canMatch: [canMatchGuardProfile],
  },
];
