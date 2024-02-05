import { Routes } from '@angular/router';
import { CreationFormComponent } from './pages/creation-form/creation-form.component';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from '../profile-creation/guards/profile-set.guard';
import { canActivateGuard, canMatchGuard } from '../auth/guards/auth.guard';

export const PROFILE_CREATION_ROUTES: Routes = [
  {
    path: 'create',
    component: CreationFormComponent,
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: 'edit/:id',
    component: CreationFormComponent,
    canActivate: [canActivateGuardProfile],
    canMatch: [canMatchGuardProfile],
  },
];
