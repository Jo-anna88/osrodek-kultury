import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = "";

  constructor(private http: HttpClient) { }

  sendMessage(input: any) { // ? source: https://medium.com/@babatundelamidi/build-an-angular-contact-form-and-post-data-to-email-7b7327e56ad3
    return this.http.post(this.api, input, {responseType: "text"}).pipe(
      map(
        (res) => {res},
        (error: any) => {error}
      )
    )
  }
}
