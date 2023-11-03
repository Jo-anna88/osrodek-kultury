import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Alert, alertTypeToStyleMapping, IAlertStyle, Severity} from "../alert.model";

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

  ngOnInit(): void {
    this.alertStyle = alertTypeToStyleMapping.get(this.alert.severity)!;
  }
  onClose(): void {
    //this.alertService.removeAlert();
    this.isHidden = true;
    this.onAlertClose.emit(this.alert);
  }

}
