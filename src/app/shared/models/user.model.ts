export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username: string; // e.g. email, login
  password?: string; // ?? todo: remove password from this place?
  role?: Role;
  token?: string
}

export interface Credentials {
  username: string;
  password: string;
}

export enum Role {
  User = 'User', // read-only (or: 'unknown', 'viewer') todo: is this role needed?
  Client = 'Client', // logged-in user
  Employee = 'Employee', // np. księgowa, nauczyciel, sprzątaczka, etc. (can add and update)
  Teacher = 'Teacher', // logged-in user todo: is this role needed?
  Director = 'Director', // logged-in user (or: 'publisher') todo: is this role needed?
  Admin = 'Admin' // logged-in user, 'superuser' (can add, update and delete; can add new employees)
}

export enum Privilege {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  // OTHER = 'OTHER'
}
