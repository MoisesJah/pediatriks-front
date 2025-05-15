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
    let redirectUrl = '';
    switch (authService.user()?.tipo_user) {
      case 'administrador':
        redirectUrl = '/admin/dashboard';
        break;
      case 'terapista':
        redirectUrl = '/terapista/dashboard';
        break;
      case 'paciente':
        redirectUrl = '/dashboard';
        break;
      case 'secretaria':
        redirectUrl = '/admin/reservar-cita';
        break;
      default:
        break;
    }
    router.navigate([redirectUrl]);
    return false;
  }

  if (
    (authService.isAdmin() || authService.isSecretaria()) &&
    !isAdminRoute &&
    !state.url.includes('ficha-result')
  ) {
    router.navigateByUrl('/admin/dashboard');
    return false;
  }

  if (authService.isSecretaria() && state.url.includes('dashboard')) {
    router.navigateByUrl('/admin/reservar-cita');
    return false;
  }

  if (
    authService.isAuthenticated() &&
    !authService.isAdmin() &&
    !authService.isSecretaria() &&
    isAdminRoute
  ) {
    const redirectUrl = authService.isTerapista()
      ? '/terapista/dashboard'
      : '/dashboard';
    router.navigateByUrl(redirectUrl);
    return false;
  }

  return true;
};
