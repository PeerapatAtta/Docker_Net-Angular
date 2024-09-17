import { CanActivateFn, Router } from '@angular/router';
//Add import
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  //DI
  const router = inject(Router);
  const auth = inject(AuthService);

  //If login then go to dashboard page
  if (auth.isLoggedIn()) {
    if (state.url == '/login' || state.url == '/register') {
      router.navigate(['dashboard'])
    }
    return true
  }
  //If not login then go to login page
  else {
    if (state.url != '/login' && state.url != '/register') {
      router.navigate(['login'])
    }
    return true
  } 
};
