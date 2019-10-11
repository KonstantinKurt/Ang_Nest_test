import {Router} from '@angular/router';

export function checkToken(router: Router) {
   if (!localStorage.getItem('auth_token')) {
      router.navigateByUrl('/');
   }
}
