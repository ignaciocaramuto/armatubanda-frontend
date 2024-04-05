import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {
  canActivateGuardPublic,
  canMatchGuardPublic,
} from './guards/public.guard';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

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
    path: 'reset-password/:token',
    component: ResetPasswordPageComponent,
  },
];
