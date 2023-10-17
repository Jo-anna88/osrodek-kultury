import { Injectable } from '@angular/core';
import {Alert, Severity} from "./alert.model";
import {delay, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$: Subject<Alert | null> = new Subject();
  addAlert(alert: Alert) {
    this.alert$.next(alert);
    console.log("Alert Service: ");
    console.log(alert);
  }
  addAlert2(severity: Severity, description: string) {

  }
  addAllAlerts(alerts: Alert[]) {
    console.log("alerts are being added")
    for (let alert of alerts) {
      console.log(alert);
      this.alert$.next(alert);
    }
  }

  removeAlert() {
    this.alert$.next(null);
  }

  getAlert(): Observable<Alert|null> {
    console.log("getAlert function")
    return this.alert$.asObservable();
  }

  /*
  alerts: Alert[] = [];
  add(alert: Alert) {
    this.alerts.push(alert);
  }
  addAll(alerts: Alert[]) {
    alerts.forEach(
      (alert) => this.alerts.push(alert)
    );
  }
  clear(alert: Alert) {
    const index: number = this.alerts.findIndex(
      (_alert) => (_alert.id === alert.id)
    )
    this.alerts.splice(index,1);
  }
  clearAll() {
    this.alerts = [];
  }

   */
}
