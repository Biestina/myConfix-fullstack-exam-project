import { Injectable } from '@angular/core';
import { AuthService } from './../app/services/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    let request = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err.status, 'ERROR');
        if (err.status === 401) {
          return throwError(() => new Error('Bejelentkezés szükséges'));
        } else if (err.status === 403) {
          return this.handle403Error(request, next);
        } else {
          return throwError(() => new Error('Oops something happened'));
        }
      })
    );
    // return next.handle(request);
  };

  handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap((tokenData) => {
        const newRequest = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${tokenData.accessToken}`
          ),
        });
        return next.handle(newRequest);
      })
    );
  };
}
