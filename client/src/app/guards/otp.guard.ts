import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const otpGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (localStorage.getItem('formStatus')) {

    return true;
  }

  else {

    router.navigate(['/auth/register']);
    return false;
  }

};
