export interface Message {
  id: number;
  severity: Severity;
  detail: String;
}

export enum Severity {
  Success = 'Success',
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error'
}
