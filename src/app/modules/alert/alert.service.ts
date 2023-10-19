import { Injectable } from '@angular/core';
import {Alert, Severity} from "./alert.model";
import {BehaviorSubject, delay, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$: BehaviorSubject<any> = new BehaviorSubject(undefined); //BehaviorSubject<Alert|null>
  addAlert(alert: Alert) {
    this.alert$.next(alert);
  }
  addAllAlerts(alerts: Alert[]) {
    for (let alert of alerts) {
      this.alert$.next(alert);
    }
  }

  removeAlert() {
    this.alert$.next(null);
  }

  getAlert(): Observable<Alert|null> {
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
