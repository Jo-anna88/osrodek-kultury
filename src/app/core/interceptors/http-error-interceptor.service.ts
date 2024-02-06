import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {filter, Observable, retry, RetryConfig, tap} from 'rxjs';
import {HttpErrorHandlerService} from "../services/http-error-handler.service";

const retryConfig: RetryConfig = {count: 2, delay: 2000, resetOnSuccess: false};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Http Error Interceptor", request);
    /*
    request = request.clone({
      withCredentials: true,
    });
    */
    /*
    if(request.url.includes("auth")) {
      return next.handle(request);
    }
     */
    return next.handle(request)
      .pipe(
        retry(retryConfig), // to deal with slow connection
        // todo: it should happen only in case of error
        tap({
          next: (v) => { // HttpResponse (then succeeds) or other events, e.g. the first one is {type: 0}
            // "The object { type: 0 } is simply the first HttpEvent of type Sent, emitted directly after the request is sent but before the response arrives.", source: stackoverflow
            console.log("tap next: ", v)
          },
          error: (err) => {
            console.log("tap error") // HttpErrorResponse or other
            //this.injector.get(HttpErrorHandlerService).handleError(err);
          }
        })
    )
  }
}
