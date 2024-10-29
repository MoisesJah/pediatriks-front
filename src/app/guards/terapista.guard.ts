import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const terapistaGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  if (!authService.isTerapista()) {
    return false;
  }

  return true;
};
