import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  if (!authService.isAdmin()) {
    return false;
  }

  return true;
};
