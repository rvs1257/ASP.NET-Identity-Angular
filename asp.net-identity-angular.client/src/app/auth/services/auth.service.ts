import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, ManageInfoResponse, RegisterRequest } from '@auth/types';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  register(credentials: RegisterRequest) {
    return this.httpClient.post('/auth/register', credentials);
  }

  login(credentials: LoginRequest) {
    const httpOptions = {
      params: {
        useCookies: true
      }
    };
    return this.httpClient.post<LoginResponse>('/auth/login', credentials, httpOptions).pipe(
      map(result => {
        this.isAuthenticated.next(true);
        return result;
      })
    );
  }

  info() {
    const httpOptions = {
      withCredentials: true
    };

    return this.httpClient.get<ManageInfoResponse>('/auth/manage/info', httpOptions);
  }

  logout() {
    return this.httpClient.post('/auth/logout', {}).pipe(
      map(result => {
        this.isAuthenticated.next(false);
        return result;
      })
    );
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
