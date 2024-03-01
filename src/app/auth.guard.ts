import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from 'express';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if(authService.isAuthenticated()) {
    return true;
  }
  else {
    router.navigate(['/login'])
    return false;
  }
};
