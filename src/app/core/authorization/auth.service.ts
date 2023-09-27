import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IUser, Role} from "../../shared/models/user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private loggedIn: boolean;
  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ) : Observable<HttpResponse<any>>{
    if(email==="test" && password==="test") {return of(new HttpResponse({status: 403}))}
      //return of(new Error("wrong password"));
      //return of(new HttpResponse({status: 403}));
    let user: IUser = {id: 0, login: email, password: password, role: Role.Client, token: ""}
    console.log("Auth service - user: "+ user.id + " " + user.login + " " + user.role + " " + user.token);
    return of(new HttpResponse({ status: 200, body: {
        id: user.id,
        login: email,
        role: user.role,
        token: 'fake-jwt-token'
      }}));
    //return this.http.post<IUser>('/api/login', {email, password})
      // this is just the HTTP call,
      // we still need to handle the reception of the token
      //.shareReplay(); - TODO: it does not work ("We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.")
  }

  logout() {

  }

  isLoggedIn() : boolean {
    return true; //TODO ...
    //return this.isLoggedIn;
  }

}
