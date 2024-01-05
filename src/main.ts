import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  canActivateGuardTrue,
  canMatchGuardTrue,
} from './app/modules/auth/guards/check-auth.guard';
import {
  canActivateGuardProfile,
  canMatchGuardProfile,
} from './app/modules/profile-creation/guards/profile-set.guard';
import {
  canActivateGuard,
  canMatchGuard,
} from './app/modules/auth/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, MatSnackBarModule, MatNativeDateModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      {
        path: '',
        loadComponent: () =>
          import('./app/modules/home/pages/home-page/home-page.component').then(
            (c) => c.HomePageComponent
          ),
        canActivate: [canActivateGuardTrue],
        canMatch: [canMatchGuardTrue],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import(`./app/modules/auth/auth.routes`).then((r) => r.AUTH_ROUTES),
      },
      {
        path: 'list',
        loadComponent: () =>
          import(`./app/modules/list/pages/list-page/list-page.component`).then(
            (c) => c.ListPageComponent
          ),
        canActivate: [canActivateGuardProfile],
        canMatch: [canMatchGuardProfile],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import(`./app/modules/profile/profile.routes`).then(
            (r) => r.PROFILE_ROUTES
          ),
      },
      {
        path: 'new-profile',
        loadComponent: () =>
          import(
            `./app/modules/profile-creation/pages/creation-form/creation-form.component`
          ).then((c) => c.CreationFormComponent),
        canActivate: [canActivateGuard],
        canMatch: [canMatchGuard],
      },
      {
        path: 'band/:id',
        loadChildren: () =>
          import(`./app/modules/band/band.routes`).then((r) => r.BAND_ROUTES),
      },
    ]),
  ],
}).catch((err) => console.error(err));
