import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

import { canActivateGuard,canMatchGuard } from './modules/auth/guards/auth.guard';
import { canActivateGuardPublic,canMatchGuardPublic } from './modules/auth/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule),
    canActivate: [canActivateGuardPublic],
    canMatch:[canMatchGuardPublic]
  },
  {
    path: 'list',
    loadChildren: () => import(`./modules/list/list.module`).then(m => m.ListModule),
    canActivate: [canActivateGuard],
    canMatch:[canMatchGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
