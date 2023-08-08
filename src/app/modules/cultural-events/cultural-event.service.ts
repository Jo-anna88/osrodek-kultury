import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {mockCulturalEvents} from "./cultural-events/mock-cultural-events";
import {ICulturalEvent} from "./cultural-events/cultural-event";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CulturalEventService {
  private apiUrl = "http://localhost:4200/events";

  constructor(private http: HttpClient) { }

  getEvents() : Observable<Array<ICulturalEvent>>{
    //return this.http.get(`${this.apiUrl}`, responseType: );
    return of(mockCulturalEvents);
  }
}
