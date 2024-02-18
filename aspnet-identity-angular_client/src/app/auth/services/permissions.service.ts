import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }

  canActivate(): boolean {
    const loggedIn = localStorage.getItem(AuthService.userSessionInfoKey) !== null;
    if (loggedIn) {
      return true;
    }
    return false;
  }
  canMatch(): boolean {
    return true;
  }
}
