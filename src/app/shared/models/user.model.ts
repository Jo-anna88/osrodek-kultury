export interface User {
  id?: string; // UUID
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string; // e.g. email, login
  dob?: string;
  age?: number;
  headshot?: string;
  role?: Role;
  position?: string;
  description?: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export enum Role {
  Client = 'CLIENT', // logged-in user
  Employee = 'EMPLOYEE', // np. księgowa, nauczyciel, sprzątaczka, etc. (can add and update)
  Admin = 'ADMIN' // logged-in user, 'superuser' (can add, update and delete; can add new employees)
}

export enum Privilege {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  // OTHER = 'OTHER'
}

export interface UserSimpleData { // in backend: UserBasicInfo
    id?: string, // UUID
    firstName?: string,
    lastName?: string
}
