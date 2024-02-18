import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {
  canActivateGuardPublic,
  canMatchGuardPublic,
} from './guards/public.guard';
import { ConfirmationEmailPageComponent } from './pages/confirmation-email-page/confirmation-email-page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [canActivateGuardPublic],
    canMatch: [canMatchGuardPublic],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [canActivateGuardPublic],
    canMatch: [canMatchGuardPublic],
  },
  {
    path: 'confirm/:token',
    component: ConfirmationEmailPageComponent,
  },
];
