import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert} from "../alert.model";
import {AlertService} from "../alert.service";
import {alerts} from "../alert-mock";
import {Subscription} from "rxjs";

@Component({
  selector: 'alerts', //app-alert-list
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlert()
      .subscribe(alert => {
        if (alert) {
          this.alerts.push({id: alerts.length++, description: alert.description, severity: alert.severity});
        } else {
          this.alerts = []
        } //?
      })
  }

  removeAlert(alert: Alert) {
    // todo: it should be moved to alert service:
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
