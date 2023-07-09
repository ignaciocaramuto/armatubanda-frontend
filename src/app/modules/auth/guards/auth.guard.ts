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
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


const checkAuthStatus = ():Observable<boolean> | boolean => {

  const authService:AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if (!isAuthenticated){
          router.navigateByUrl('/auth/login');
        }
      })
    );


}


export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
)=>{
  return checkAuthStatus();
}


export const canActivateGuard : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};


