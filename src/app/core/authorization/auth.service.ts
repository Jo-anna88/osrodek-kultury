import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User, Role, Credentials} from "../../shared/models/user.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
//import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService { // authentication && authorization
  private apiUrl: string = environment.baseUrl + '/api/auth';
  isAuthenticated$ = new BehaviorSubject<boolean | undefined>(undefined); // for auth.guard
  role$ = new BehaviorSubject<Role | null>(null);
  constructor(private http: HttpClient) {}

  logIn(credentials: Credentials): Observable<User> { // username (email) and password; to authenticate
    return this.http.post<User>(this.apiUrl +'/login', credentials, {withCredentials: true})
  } // here a token should be sent in a cookie

  signUp(newUser: User, pswd: string): Observable<HttpResponse<any>> {
    let fullUser = {...newUser, password: pswd}
    return this.http.post<any>(this.apiUrl +'/signup', fullUser, {withCredentials: true});
  }

  logout():Observable<any> {
    return this.http.post<any>(this.apiUrl + '/logout', {}, {withCredentials: true});
  }

  setAuthenticated() {
    this.isAuthenticated$.next(true);
  }

  setNotAuthenticated() {
    this.isAuthenticated$.next(false);
  }

  // authorization
  setRole() {
    this.getRole().subscribe({
        next: (response: {role: Role}) => {
          this.role$.next(response.role);
        }
      }
    )
  }

  setRoleToNull() {
    this.role$.next(null);
  }

  getRole(): Observable<{role: Role}> {
    return this.http.get<{role: Role}>(this.apiUrl +'/role', {withCredentials: true});
  }

  initAuthStatus() { // for browser refresh (check if user has been already authenticated and set up user's role)
    this.http.get<{ result: boolean }>(this.apiUrl + '/status', {withCredentials: true}).subscribe({
      next: (value) => {
        this.isAuthenticated$.next(value.result);
        if (value.result) {
          this.setRole();
        }
      }
    })
  }
}
