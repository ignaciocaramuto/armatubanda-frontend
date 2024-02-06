import { CanActivateFn } from '@angular/router';

export const bandGuard: CanActivateFn = (route, state) => {
  return true;
};
