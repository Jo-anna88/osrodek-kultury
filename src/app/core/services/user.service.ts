import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<IUser | null | undefined>(undefined); // inital _value: undefined
  constructor() { }

  setCurrentUser(currentUser: IUser) {
    this.user$.next(currentUser);
  }
}
