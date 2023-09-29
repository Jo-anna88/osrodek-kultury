import { Injectable } from '@angular/core';
import { IAlert } from "./alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: IAlert[] = [];
  add(alert: IAlert) {
    this.alerts.push(alert);
  }
  addAll(alerts: IAlert[]) {
    alerts.forEach(
      (alert) => this.alerts.push(alert)
    );
  }
  clear(alert: IAlert) {
    const index: number = this.alerts.findIndex(
      (_alert) => (_alert.id === alert.id)
    )
    this.alerts.splice(index,1);
  }
  clearAll() {
    this.alerts = [];
  }
}
