import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  let _CookieService = inject(CookieService),
      _Router = inject(Router);

    if(_CookieService.check('userToken')) {
      return true;
    } else {
      _Router.navigate(['/login']);
      return false;
    }
};
