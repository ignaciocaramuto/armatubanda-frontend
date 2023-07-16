import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


const checkAuthStatus = ():Observable<boolean> | boolean => {

  const authService:AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if (isAuthenticated){
          router.navigateByUrl('./');
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
}

export const canMatchGuardTrue: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
)=>{
  checkAuthStatus();
  return true;
}


export const canActivateGuardTrue : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  checkAuthStatus();
  return true;
};
