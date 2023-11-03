import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {AlertService} from "../../modules/alert/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError, TimeoutError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService  implements ErrorHandler {
  // https://stackoverflow.com/questions/52610218/angular-handle-for-500-server-errors - error interceptor
  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {
    const alertService = this.injector.get(AlertService);

    if (error instanceof TimeoutError) {
      alertService.error('Timeout Exception');
    }

    if (error instanceof HttpErrorResponse) {
      //console.log('Error Handler Service');
      //alertService.error('Error: '+ error.status);
    }

    if (error instanceof Error) {
      alertService.error('An unknown error occurred');
    }
  }
}
