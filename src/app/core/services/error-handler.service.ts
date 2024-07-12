import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {AlertService} from "../../modules/alert/alert.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {TimeoutError} from "rxjs";
import {Router} from "@angular/router";
import {
  AppError,
  createErrorDescription,
  createHttpAppError
} from "../../shared/models/app-error.model";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  // https://stackoverflow.com/questions/52610218/angular-handle-for-500-server-errors - error interceptor
  constructor(private injector: Injector) {
  }

  handleError(error: Error) {
    const alertService: AlertService = this.injector.get(AlertService);
    const router: Router = this.injector.get(Router);

    if (error instanceof TimeoutError) {
      alertService.error('Timeout Exception');
    }

    else if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case HttpStatusCode.NotFound: {
          router.navigateByUrl('/not-found');
          break;
        }
        case HttpStatusCode.Unauthorized: {
          alertService.error("Sorry, the login or password is incorrect.\nPlease try again.");
          break;
        }
        case HttpStatusCode.InternalServerError: {
          let appError: AppError = createHttpAppError(error);
          router.navigateByUrl('/error', {
            state: {appError} // Pass the error object using navigation extras
          });
          break;
        }
        default: {
          let appError: AppError = createHttpAppError(error);
          alertService.error("", appError);
          break;
        }
      }
    }

    else {
      let errorDescription: string = createErrorDescription(error);
      alertService.error('An unknown error occurred.\n'+errorDescription);
    }
  }
}
