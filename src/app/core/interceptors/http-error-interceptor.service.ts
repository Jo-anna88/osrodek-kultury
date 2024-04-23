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
    console.log(request);

    // set 'withCredentials' to 'true' to all requests
    request = request.clone({
      withCredentials: true,
    });

   // handle requests with credentials to not retry them
    if(request.url.includes("login")) {
      return next.handle(request);
    }

    return next.handle(request)
      .pipe(
        retry(retryConfig), // retry request to deal with slow connection
        // todo: it should happen only in case of error
        tap({
          next: (v) => { // HttpResponse (then succeeds) or other events, e.g. the first one is {type: 0}
            // "The object { type: 0 } is simply the first HttpEvent of type Sent, emitted directly after the request is sent but before the response arrives.", source: stackoverflow
            console.log(v); // log http response object
          },
          error: (err) => {
            this.injector.get(HttpErrorHandlerService).handleError(err); // handle HttpErrorResponse and other Errors
          }
        })
    )
  }
}
