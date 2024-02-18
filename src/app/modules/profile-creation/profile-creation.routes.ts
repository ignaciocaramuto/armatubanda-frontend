import { Routes } from '@angular/router';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import {
  canActivateGuardProfile,
  canEditProfile,
  canMatchGuardProfile,
} from '../profile-creation/guards/profile-set.guard';
import { canActivateGuard, canMatchGuard } from '../auth/guards/auth.guard';
import { emailConfirmedGuard } from '../auth/guards/email-confirmed.guard';

export const PROFILE_CREATION_ROUTES: Routes = [
  {
    path: 'create',
    component: CreationFormComponent,
    canActivate: [canActivateGuard, emailConfirmedGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: 'edit/:id',
    component: CreationFormComponent,
    canActivate: [canActivateGuardProfile, canEditProfile, emailConfirmedGuard],
    canMatch: [canMatchGuardProfile],
  },
];
