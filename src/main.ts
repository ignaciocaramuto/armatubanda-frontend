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
  HttpClient,
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
import {
  TranslateLoader,
  TranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { emailConfirmedGuard } from './app/modules/auth/guards/email-confirmed.guard';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const translateModuleConfig: TranslateModuleConfig = {
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(TranslateModule.forRoot(translateModuleConfig)),
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
        canActivate: [canActivateGuardProfile, emailConfirmedGuard],
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
        path: 'musician',
        loadChildren: () =>
          import(`./app/modules/profile-creation/profile-creation.routes`).then(
            (r) => r.PROFILE_CREATION_ROUTES
          ),
      },
      {
        path: 'band',
        loadChildren: () =>
          import(`./app/modules/band/band.routes`).then((r) => r.BAND_ROUTES),
      },
      {
        path: 'advertisements',
        loadComponent: () =>
          import(
            `./app/modules/advertisements/pages/advertisements-page/advertisements-page.component`
          ).then((c) => c.AdvertisementsPageComponent),
        canActivate: [canActivateGuard, emailConfirmedGuard],
        canMatch: [canMatchGuard],
      },
      {
        path: 'admin',
        loadComponent: () =>
          import(
            `./app/modules/admin/pages/overview-page/overview-page.component`
          ).then((c) => c.OverviewPageComponent),
      },
    ]),
  ],
}).catch((err) => console.error(err));
