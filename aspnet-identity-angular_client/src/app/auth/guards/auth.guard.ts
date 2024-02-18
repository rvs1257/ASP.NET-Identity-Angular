import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionsService } from '@auth/services/permissions.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate() || inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
