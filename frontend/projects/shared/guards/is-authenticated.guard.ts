import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../host/src/app/auth/auth.service';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.notAuthenticated) {
    router.navigateByUrl('/login');
    console.log('Token invalido');
    return false;
  }
  if (authService.authStatus() === AuthStatus.authenticated) {
    console.log(authService.authStatus());
  }
  return true;
};
