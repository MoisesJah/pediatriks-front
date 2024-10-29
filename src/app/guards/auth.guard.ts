import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isUnauthenticated = !authService.isAuthenticated();
  const isLoginOrRegister = ['/login', '/registrate'].includes(state.url);
  const isAdminRoute = state.url.includes('admin');

  if (isUnauthenticated && !isLoginOrRegister) {
    router.navigate(['/login']);
    return false;
  }

  if (isLoginOrRegister && authService.isAuthenticated()) {
    const redirectUrl = authService.isAdmin() ? '/admin/dashboard' : '/dashboard';
    router.navigate([redirectUrl]);
    return false;
  }

  if(authService.isAdmin() && !isAdminRoute) {
    router.navigateByUrl('/admin/dashboard');
    return false;
  }

  if (authService.isAuthenticated() && !authService.isAdmin() && isAdminRoute) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};

