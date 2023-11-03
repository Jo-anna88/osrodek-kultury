import {Component, Input} from '@angular/core';
import {AppErrorModel} from "../../models/app-error.model";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input()
  error: AppErrorModel = {status: -1, statusTxt: "", description: ""};
}
