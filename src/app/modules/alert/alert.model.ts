export interface IAlert {
  id?: number;
  severity: Severity;
  description: string;
}

export enum Severity {
  Success = 'Success',
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
  None = 'None'
}
