import {Component, Input} from '@angular/core';
import {AppError} from "../../models/app-error.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input()
  error: AppError = {status: -1, statusTxt: "", description: ""};

  constructor(private router: Router) {
    let navigation = this.router.getCurrentNavigation();
    if(!!navigation && !!(navigation.extras.state as {appError: AppError})) {
      let errorFromNavigation = navigation.extras.state as {appError: AppError}
      this.error = errorFromNavigation.appError;
    }
  }
}
