import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // inital _value: undefined (it means we are not fetching the user yet)
  user$ = new BehaviorSubject<IUser | null | undefined>(undefined);
  constructor() { }

  setCurrentUser(currentUser: IUser) {
    this.user$.next(currentUser);
    console.log(this.user$.value);
  }
  setCurrentUserToNull() {
    this.user$.next(null);
    console.log(this.user$.value);
  }
  /*
  setCurrentUser() {
    if(localStorage.getItem('token')){
    or rather make an API call to get currentUser
  }
  */
}
