export interface IUser {
  id: number;
  login: string; // e.g. email
  password?: string; // ?? todo: remove password from this place?
  firstName?: string;
  lastName?: string;
  role: Role;
  token?: string
}

export enum Role {
  User = 'User', // read-only (or: 'unknown', 'viewer')
  Client = 'Client', // logged-in user
  Teacher = 'Teacher', // logged-in user
  Director = 'Director', // logged-in user (or: 'publisher')
  Admin = 'Admin' // logged-in user, 'superuser'
}

export enum Privilege {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  // OTHER = 'OTHER'
}
