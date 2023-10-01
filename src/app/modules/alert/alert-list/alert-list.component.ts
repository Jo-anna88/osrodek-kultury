import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert, Severity} from "../alert.model";
import {AlertService} from "../alert.service";
import {alerts} from "../alert-mock";
import {Subscription} from "rxjs";

@Component({
  selector: 'alerts', //app-alert-list
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit, OnDestroy {
  //alerts: Alert[] = alerts;
  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    console.log("alert list component")
    this.alertSubscription = this.alertService.getAlert()
      .subscribe(alert => {
        console.log("alert in alert list: " + alert);
        if (alert) {
          this.alerts.push({id: alerts.length++, description: alert.description, severity: alert.severity});
        } else {
          this.alerts = []
        } //?
      })
  }

  removeAlert(alert: Alert) {
    const index: number = this.alerts.findIndex(
      (_alert) => (_alert.id === alert.id)
    )
    this.alerts.splice(index,1);
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
  }
}
