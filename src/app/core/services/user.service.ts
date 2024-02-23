import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import {StorageService} from "./storage.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../authorization/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.baseUrl + '/api/user';
  // inital _value: undefined (it means we are not fetching the user yet)
  user$ = new BehaviorSubject<User | null | undefined>(undefined);
  constructor(private http: HttpClient) {
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

  getUserBasicData(): Observable<{firstName: string, lastName: string}> {
    return this.http.get<{firstName: string, lastName: string}>(this.apiUrl +'/user-basic-data', {withCredentials: true});
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl +'/profile', {withCredentials: true});
  }
}
