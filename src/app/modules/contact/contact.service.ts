import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactMessage} from "./contactMessage.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environment.baseUrl + '/api/contact';

  constructor(private http: HttpClient) { }

  sendMessage(input: ContactMessage) {
    return this.http.post(`${this.apiUrl}`, input);
  }
}
