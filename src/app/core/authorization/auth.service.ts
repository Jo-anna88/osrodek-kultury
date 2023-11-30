import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User, Role} from "../../shared/models/user.model";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
//import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.baseUrl + '/api/auth';
  //private isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
  }

  /*
  login(email:string, password:string ) : Observable<HttpResponse<any>>{
    if(email==="test" && password==="test") {return of(new HttpResponse({status: 403}))}
    let user: IUser = {id: 0, login: email, password: password, role: Role.Client, token: ""}
    console.log("Auth service - user: "+ user.id + " " + user.login + " " + user.role + " " + user.token);
    return of(new HttpResponse({ status: 200, body: {
        id: user.id,
        login: email,
        role: user.role,
        token: 'fake-jwt-token'
      }}));

    //return this.http.post<IUser>('/api/login', {email, password})
     // .do(res => this.setSession)
    // this is just the HTTP call,
      // we still need to handle the reception of the token
      //.shareReplay(); - TODO: it does not work ("We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.")
  }

   */

  logIn(email:string, password:string): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl +'/login', {email: email, password: password})
  }

  signUp(newUser: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl +'/signup', newUser);
  }
/*
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
*/
}
