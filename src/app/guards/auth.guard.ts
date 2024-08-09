import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authRoutes = ['/login', '/registrate'];

  //redirect to login if not authenticated
  if (!authService.isAuthenticated() && state.url !== '/' && !authRoutes.includes(state.url)) {
    console.log(state.url);
    console.log(authRoutes.includes(state.url));
    console.log(!authRoutes.includes(state.url));
    console.log(authService.isAuthenticated());
    router.navigate(['/login']);
    return false;
  }

  // redirect to dashboard if already logged in
  if (authRoutes.includes(state.url) && authService.isAuthenticated()) {
    const redirectUrl = authService.isAdmin() ? '/admin/dashboard' : '/dashboard';
    router.navigate([redirectUrl]);
    return false;
  }

  // if user logged in is not admin and try to access admin, redirect to dashboard
  if(!authService.isAdmin() && state.url.includes('admin')  && authService.isAuthenticated()) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};

