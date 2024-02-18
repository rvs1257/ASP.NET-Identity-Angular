import { Router, UrlTree } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  apiRoutes = [
    'https://127.0.0.1:4200/',
    'https://localhost:4200/',
    'https://127.0.0.1:7043/',
    'https://localhost:7043/'
  ];

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (requestError && requestError.status === 401 && this.apiRoutes.some(r => requestError.url?.startsWith(r))) {
          this.authService.redirectToLogin();
        }
        return throwError(() => new Error(requestError.message));
      })
    );
  }
}
