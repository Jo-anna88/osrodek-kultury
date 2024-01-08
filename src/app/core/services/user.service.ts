import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Role, User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // inital _value: undefined (it means we are not fetching the user yet)
  user$ = new BehaviorSubject<User | null | undefined>(undefined);
  constructor() {
    // this.user$.next(null); // to test a situation when user or password are incorrect (user = null)

    // this.user$.next({ // to test a situation when there is a user
    //   firstName: "firstName",
    //   id: 0,
    //   lastName: "lastName",
    //   password: "pswd",
    //   phone: "123",
    //   token: "fake-token",
    //   username: "a@o2.pl",
    //   role: Role.Client
    // })
  }

  setCurrentUser(currentUser: User) {
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
