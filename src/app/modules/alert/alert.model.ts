export class Alert {
  id?: number;
  severity: Severity;
  description: string;
  constructor(severity: Severity, description: string) {
    this.severity = severity;
    this.description = description;
    this.id = 1; //todo: backend
  }
}

export enum Severity {
  Success = 'SUCCESS',
  Info = 'INFO',
  Warn = 'WARNING',
  Error = 'ERROR',
  None = ''
}
