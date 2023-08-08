import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactMessage} from "./contact/contactMessage";
import {catchError, map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = "http://localhost:4200/contact"; // or: this.environmentService.getApiBaseUrl() + /contact - in constructor

  constructor(private http: HttpClient) { }

  sendMessage(input: ContactMessage) { // ? source: https://medium.com/@babatundelamidi/build-an-angular-contact-form-and-post-data-to-email-7b7327e56ad3
    return this.http.post(`${this.apiUrl}`, input, {responseType: "text"}).subscribe({
      next: (res: string) => {
        console.log(res)
      },
      error: (err: any) => {
        alert('An error has occurred while sending email');
        console.error(err)
      },
      complete: () => {
        alert('The message has been sent successfully') // to show the alert on the current page
        console.info('complete')
      }
    });
  }

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
}
