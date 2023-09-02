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
  import { inject } from '@angular/core';
  import { AuthService } from '../../auth/services/auth.service';
  
  
  const checkProfileSet = ():Observable<boolean> | boolean => {
  
    const authService:AuthService = inject(AuthService);
    const router: Router = inject(Router);
  
    return authService.checkProfileSet()
      .pipe(
        tap( isProfileSet => {
            if(!isProfileSet){
                router.navigateByUrl('/new-profile');
            }
        })
      );
  }
  
  export const canMatchGuardProfile: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  )=>{
    return checkProfileSet();
  }
  
  
  export const canActivateGuardProfile : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return checkProfileSet();
  };
  