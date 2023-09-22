import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ) {
    return this.http.post<IUser>('/api/login', {email, password})
      // this is just the HTTP call,
      // we still need to handle the reception of the token
      //.shareReplay(); - TODO: it does not work ("We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.")
  }

}
