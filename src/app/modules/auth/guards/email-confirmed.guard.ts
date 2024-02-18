import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const emailConfirmedGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const user = authService.currentUser();
  const router: Router = inject(Router);

  if (user()!.emailVerified) {
    return true;
  }

  // router.navigateByUrl('/auth/pending-email-confirm');
  // TODO: Change to false when API returns emailVerified prop
  return true;
};
