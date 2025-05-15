import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  // if (!authService.isAdmin() || !authService.isSecretaria()) {
  //   return false;
  // }

  const canMatch = authService.isAdmin() || authService.isSecretaria();

  if (!canMatch) {
    return false;
  }

  return true;
};
