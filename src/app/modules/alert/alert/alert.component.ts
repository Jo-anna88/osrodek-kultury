import {Component} from '@angular/core';
import {Alert, Severity} from "../alert.model";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  alert: Alert = new Alert(Severity.Warn, "this is an alert's description");
  alertIcon: string;
  errorTypeToIconMapping = new Map<string, string>([
    [Severity.Success, ''],
    [Severity.Info, ''],
    [Severity.Warn,'bi bi-phone'],
    [Severity.Success, ''],
    [Severity.None, '']
  ])
  constructor() {
    this.alertIcon = this.errorTypeToIconMapping.get(this.alert.severity)!;
  }
}
