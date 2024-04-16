import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {CulturalEvent} from "./cultural-event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {mockCulturalEvents} from "./mock-cultural-events";

@Injectable({
  providedIn: 'root'
})
export class CulturalEventService {
  private apiUrl: string = environment.baseUrl + '/api/events';

  constructor(private http: HttpClient) { }

  //TODO:return max 10 events for page and max 30 events from all of them (pagination needed!)
  getEvents() : Observable<Array<CulturalEvent>> {
    //return this.http.get(`${this.apiUrl}`, responseType: );
    return this.http.get<Array<CulturalEvent>>(this.apiUrl);
    //return of(mockCulturalEvents);
  }

  getEventById(id: number) : Observable<CulturalEvent> {
    //return of(mockCulturalEvents[0]);
    return this.http.get<CulturalEvent>(this.apiUrl+ '/' + id)
  }

  createCulturalEvent(newCulturalEvent: CulturalEvent): Observable<CulturalEvent> { //Observable<Object>
    return this.http.post<CulturalEvent>(this.apiUrl, newCulturalEvent);
  }

  updateCulturalEvent(updatedCulturalEvent: CulturalEvent): Observable<CulturalEvent> {
    return this.http.put<CulturalEvent>(this.apiUrl, updatedCulturalEvent);
  }

  deleteCulturalEvent(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
