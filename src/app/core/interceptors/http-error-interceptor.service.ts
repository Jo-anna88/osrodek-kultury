import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, RetryConfig} from 'rxjs';

const retryConfig: RetryConfig = {count: 2, delay: 2000, resetOnSuccess: false};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Http Error Interceptor", request);
    return next.handle(request)
    .pipe(
      retry(retryConfig), // to deal with slow connection
    )
      /*
      .pipe(
      catchError(error => {
      if ([401,402,403].includes(error.status)) {
        console.log(error.error);
        //this.authService.logout();
      }
      this.httpErrorHandlerService.handle(error);
      throw new Error(error.error.message || error.statusText);
      //return throwError(() => err.error.message || err.statusText);
    }));
       */
  }
}
