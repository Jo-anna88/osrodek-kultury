export interface AppError {
  status: number,
  statusTxt: string,
  description: string
}

export const errorStatusToAppErrorMapping = new Map<number, AppError>([
  [0, {status:0, statusTxt: 'Connection Refused', description: 'Sorry, a client-side or network error occurred.'}],
  [401, {status:401, statusTxt: 'Unauthorized', description: 'Sorry, you should login first.'}],
  [403, {status:403, statusTxt: 'Access Denied', description: 'Sorry, you do not have permission to access this resource.'}],
  [405, {status:405, statusTxt: 'Method Not Allowed', description: 'Sorry, this method is not allowed.'}],
  [500, {status:500, statusTxt: 'Internal Server Error', description: 'Sorry for the inconvenience.\n' +
      'Please report this message to: biuro@ccw.com. Thank you very much!'}],
  [501, {status:501, statusTxt: 'Not Implemented', description: 'Sorry, the page you were looking for cannot be accessed as the server does not support the requested method.'}],
  [503, {status:503, statusTxt: 'Service Unavailable', description: 'Sorry for the inconvenience.'}],
])