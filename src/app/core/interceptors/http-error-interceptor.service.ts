import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {Observable, retry, RetryConfig, tap} from 'rxjs';
import {HttpErrorHandlerService} from "../services/http-error-handler.service";

const retryConfig: RetryConfig = {count: 2, delay: 2000, resetOnSuccess: false};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // set 'withCredentials' to 'true' to all requests
    request = request.clone({
      withCredentials: true,
    });

    console.log(request);

   // handle requests with credentials to not retry them
    if(request.url.includes("login")) {
      return next.handle(request)
        .pipe(
          tap({
            error: (err) => {
              this.injector.get(HttpErrorHandlerService).handleError(err); // handle HttpErrorResponse and other Errors
            }
          })
        );
    }

    return next.handle(request)
      .pipe(
        retry(retryConfig), // retry request to deal with slow connection
        tap({
          next: (v) => { // HttpResponse (then succeeds) or other events, e.g. the first one is {type: 0}
            // "The object { type: 0 } is simply the first HttpEvent of type Sent, emitted directly after the request is sent but before the response arrives.", source: stackoverflow
            console.log(v); // log http response object
          },
          error: (err) => {
            console.log(err);
            this.injector.get(HttpErrorHandlerService).handleError(err); // handle HttpErrorResponse and other Errors
          }
        })
    )
  }
}
