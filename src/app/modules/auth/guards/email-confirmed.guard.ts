import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const emailConfirmedGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const user = authService.currentUser();
  const router = inject(Router);

  if (user()!.emailVerified) {
    return true;
  }

  router.navigateByUrl('/auth/pending-email-confirm');
  return false;
};
