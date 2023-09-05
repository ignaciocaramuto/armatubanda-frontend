import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  canActivateGuard,
  canMatchGuard,
} from './modules/auth/guards/auth.guard';
import {
  canActivateGuardPublic,
  canMatchGuardPublic,
} from './modules/auth/guards/public.guard';
import {
  canActivateGuardTrue,
  canMatchGuardTrue,
} from './modules/auth/guards/check-auth.guard';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from './modules/profile-creation/guards/profile-set.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [canActivateGuardTrue],
    canMatch: [canMatchGuardTrue],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import(`./modules/auth/auth.module`).then((m) => m.AuthModule),
    canActivate: [canActivateGuardPublic],
    canMatch: [canMatchGuardPublic],
  },
  {
    path: 'list',
    loadChildren: () =>
      import(`./modules/list/list.module`).then((m) => m.ListModule),
    canActivate: [canActivateGuardProfile],
    canMatch: [canMatchGuardProfile],
  },
  {
    path: 'new-profile',
    loadChildren: () =>
      import(`./modules/profile-creation/profile-creation.module`).then(
        (m) => m.ProfileCreationModule
      ),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
