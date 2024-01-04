import { Routes } from '@angular/router';
import { RequestsComponent } from './pages/requests/requests.component';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from '../profile-creation/guards/profile-set.guard';

export const BAND_ROUTES: Routes = [
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [canActivateGuardProfile],
    canMatch: [canMatchGuardProfile],
  },
];
