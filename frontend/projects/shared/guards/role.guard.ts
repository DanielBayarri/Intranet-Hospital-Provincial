import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../host/src/app/auth/auth.service';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Comprobar si el usuario está autenticado
  if (authService.authStatus() === AuthStatus.authenticated) {
    const currentUser = authService.currentUser();

    // Verificar si existe un usuario actual
    if (!currentUser) {
      router.navigateByUrl('/login');
      return false;
    }

    // Obtener el rol del usuario actual
    const userRoleId = currentUser.role.id;

    // Extraer los roles permitidos de los datos de la ruta
    const allowedRoles = route.data['roles'] as number[]; // Los roles permitidos están en route.data.roles

    // Verificar si el rol del usuario está en la lista de roles permitidos
    if (!allowedRoles.includes(userRoleId)) {
      console.log('Acceso denegado: rol insuficiente');
      router.navigateByUrl('/regin/usuario/nueva-incidencia');
      return false;
    }
  }

  // Si está autenticado y tiene el rol adecuado, se permite el acceso
  return true;
};
