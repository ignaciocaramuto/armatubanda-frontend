import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

const checkProfileSet = (): Observable<boolean> | boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkProfileSet().pipe(
    tap((isProfileSet) => {
      if (!isProfileSet) {
        router.navigateByUrl('/musician/create');
      }
    })
  );
};

export const canMatchGuardProfile: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkProfileSet();
};

export const canActivateGuardProfile: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkProfileSet();
};

export const canEditProfile: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const musicianId = route.params['id'];
  const user = authService.currentUser();

  return user()?.id.toString() === musicianId;
};
