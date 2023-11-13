import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactMessage} from "./contact/contactMessage";
import {catchError, map, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environment.baseUrl + '/contact';
  //private apiUrl = this.environmentService.getApiBaseUrl() + /contact // in constructor

  constructor(private http: HttpClient) { }

  sendMessage(input: ContactMessage) {
    return this.http.post(`${this.apiUrl}`, input);
  }

  /*
  sendMessage2(input: ContactMessage) { // ? source: https://medium.com/@babatundelamidi/build-an-angular-contact-form-and-post-data-to-email-7b7327e56ad3
    return this.http.post(`${this.apiUrl}`, input, {responseType: "text"}).pipe(
      map((res: string) => {
        alert('The message has been sent successfully') // to show the alert on the current page ?
        console.log(res)
      }),
      tap(() => {
        //this.router.navigate(['/dashboard']); // Navigate after the action is dispatched
      }),
      catchError( (err: any) => {
          alert('An error has occurred while sending email');
          console.error(err);
          return of([]);
        }
      )
    );
  }
  */
}
