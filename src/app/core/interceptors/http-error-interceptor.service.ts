import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, retry, RetryConfig, tap} from 'rxjs';
import {HttpErrorHandlerService} from "../services/http-error-handler.service";

const retryConfig: RetryConfig = {count: 2, delay: 2000, resetOnSuccess: false};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Http Error Interceptor", request);
    return next.handle(request)
      .pipe(
        retry(retryConfig), // to deal with slow connection
        tap({
          next: (v) => {},
          error: (err) => {
            this.injector.get(HttpErrorHandlerService).handleError(err);
          }
        })
    )
  }
}
