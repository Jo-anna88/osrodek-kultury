export class Alert {
  static counter: number = 0;
  id: number;
  severity: Severity;
  description: string;
  constructor(severity: Severity, description: string) {
    this.severity = severity;
    this.description = description;
    this.id = Alert.counter++; //todo: backend
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
