import {Injectable} from '@angular/core';
import {Alert, Severity} from "./alert.model";
import {BehaviorSubject, Observable} from "rxjs";
import {AppError} from "../../shared/models/app-error.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$ = new BehaviorSubject<Alert | null | undefined>(undefined);
  addAlert(alert: Alert) {
    this.alert$.next(alert);
  }
  addAllAlerts(alerts: Alert[]) {
    for (let alert of alerts) {
      this.alert$.next(alert);
    }
  }
  success(description: string) {
    this.addAlert(new Alert(Severity.Success, description));
  }
  inform(description: string) {
    this.addAlert(new Alert(Severity.Info, description));
  }
  warn(description: string) {
    this.addAlert(new Alert(Severity.Warn, description));
  }
  error(description: string, appError?: AppError) {
    if(appError) {
       description = appError.status.toString() + " - " + appError.statusTxt +
         "\n" + appError.description + "\n" + appError.message;
    }
    this.addAlert(new Alert(Severity.Error, description));
  }

  removeAlert() {
    this.alert$.next(null);
  }

  getAlert(): Observable<Alert|null|undefined> {
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
