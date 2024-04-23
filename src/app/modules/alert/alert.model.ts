export class Alert {
  static counter: number = 0;
  id: number;
  severity: Severity;
  description: string;

  constructor(severity: Severity, description: string) {
    this.severity = severity;
    this.description = description;
    this.id = Alert.counter++;
  }
}

export enum Severity {
  Success = 'SUCCESS',
  Info = 'INFO',
  Warn = 'WARNING',
  Error = 'ERROR',
  None = ''
}

export interface IAlertStyle {
  colors: string
  icon: string
}

export const alertTypeToStyleMapping = new Map<string, IAlertStyle>([
  [Severity.Success, {colors:"alert-success", icon: 'bi bi-check-circle'}],
  [Severity.Info, {colors:"alert-info", icon: 'bi bi-info-circle'}],
  [Severity.Warn, {colors:"alert-warn", icon: 'bi bi-exclamation-circle'}],
  [Severity.Error, {colors: "alert-error", icon: 'bi bi-exclamation-circle-fill'}],
  [Severity.None, {colors:"alert-none", icon: ''}]
])
