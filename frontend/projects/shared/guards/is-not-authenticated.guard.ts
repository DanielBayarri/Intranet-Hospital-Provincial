import { Router, type CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../../host/src/app/auth/auth.service'
import { AuthStatus } from '../interfaces/auth/auth-status.enum'

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.authStatus() === AuthStatus.authenticated) {
    console.log('guard')
    return false
  }

  return true
}
