import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // inital _value: undefined (it means we are not fetching the user yet)
  user$ = new BehaviorSubject<IUser | null | undefined>(undefined);
  constructor() { }

  setCurrentUser(currentUser: IUser) {
    this.user$.next(currentUser);
  }
  setCurrentUserToNull() {
    this.user$.next(null);
  }
  /*
  setCurrentUser() {
    if(localStorage.getItem('token')){
    or rather make an API call to get currentUser
  }
  */
}
