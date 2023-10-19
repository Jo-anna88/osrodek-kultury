import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Alert, IAlertStyle, Severity} from "../alert.model";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output()
  onAlertClose = new EventEmitter<Alert>();

  @Input()
  alert: Alert = {id: -1, description: "", severity: Severity.None};

  alertStyle: IAlertStyle = {colors:"", icon:""};
  isHidden: boolean = false;
  alertTypeToStyleMapping = new Map<string, IAlertStyle>([
    [Severity.Success, {colors:"alert-success", icon: 'bi bi-check-circle'}],
    [Severity.Info, {colors:"alert-info", icon: 'bi bi-info-circle'}],
    [Severity.Warn, {colors:"alert-warn", icon: 'bi bi-exclamation-circle'}],
    [Severity.Error, {colors: "alert-error", icon: 'bi bi-exclamation-circle-fill'}],
    [Severity.None, {colors:"alert-none", icon: ''}]
  ])
  ngOnInit(): void {
    this.alertStyle = this.alertTypeToStyleMapping.get(this.alert.severity)!;
  }
  onClose(): void {
    //this.alertService.removeAlert();
    this.isHidden = true;
    this.onAlertClose.emit(this.alert);
  }

}
