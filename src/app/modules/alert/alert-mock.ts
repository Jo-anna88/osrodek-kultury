import {Alert, Severity} from "./alert.model";
export const alerts: Alert[] = [
  new Alert(Severity.Warn, "this is an alert's description - warning"),
  new Alert(Severity.Success, "this is an alert's description - success"),
  new Alert(Severity.Info, "this is an alert's description - info"),
  new Alert(Severity.Error, "this is an alert's description - error"),
  new Alert(Severity.None, "this is an alert's description - none")
];
