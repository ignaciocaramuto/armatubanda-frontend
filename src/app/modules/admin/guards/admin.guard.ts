import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const user = authService.currentUser();

  return user()!.role === 'ADMIN';
};
