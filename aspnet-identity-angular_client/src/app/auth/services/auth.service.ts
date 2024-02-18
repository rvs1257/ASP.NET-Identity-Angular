import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, ManageInfoResponse, RegisterRequest } from '@auth/types';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';

export interface UserSessionInfo {
  email: string;
  sessionExpires?: Date;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  static userSessionInfoKey: string = 'userSessionInfo';

  constructor(private httpClient: HttpClient, private router: Router) {
    const sessionInfo = localStorage.getItem(AuthService.userSessionInfoKey);
    if (sessionInfo) {
      this.isAuthenticated.next(true);
    }
    console.log('AuthService.constructor()', this.isAuthenticated);
  }

  register(credentials: RegisterRequest) {
    return this.httpClient.post('/api/auth/register', credentials);
  }

  redirectToLogin() {
    this.router.navigateByUrl(this.router.createUrlTree(['/login'], { queryParams: { returnUrl: this.router.url } }))
  }

  login(credentials: LoginRequest) {
    const httpOptions = {
      params: {
        useCookies: true
      }
    };
    return this.httpClient.post<LoginResponse>('/api/auth/login', credentials, httpOptions).pipe(
      map(result => {
        this.isAuthenticated.next(true);

        const sessionInfo: UserSessionInfo = {
          email: credentials.email
        };
        localStorage.setItem(AuthService.userSessionInfoKey, JSON.stringify(sessionInfo));

        return result;
      })
    );
  }

  info() {
    const httpOptions = {
      withCredentials: true
    };

    return this.httpClient.get<ManageInfoResponse>('/api/auth/manage/info', httpOptions);
  }

  logout() {
    return this.httpClient.post('/api/auth/logout', {}).pipe(
      map(result => {
        this.isAuthenticated.next(false);
        localStorage.removeItem(AuthService.userSessionInfoKey);
        return result;
      })
    );
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
