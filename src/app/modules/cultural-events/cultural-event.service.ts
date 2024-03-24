import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {mockCulturalEvents} from "./cultural-events/mock-cultural-events";
import {CulturalEvent} from "./cultural-events/cultural-event";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CulturalEventService {
  private apiUrl: string = environment.baseUrl + '/api/events';

  constructor(private http: HttpClient) { }

  //TODO:return max 10 events for page and max 30 events from all of them (pagination needed!)
  getEvents() : Observable<Array<CulturalEvent>>{
    //return this.http.get(`${this.apiUrl}`, responseType: );
    return of(mockCulturalEvents);
  }

  //TODO: add url
  addCulturalEvent(culturalEvent: CulturalEvent) { //Observable<Object>
    return this.http.post('', culturalEvent);
  }

  //TODO: add url
  editCulturalEvent(culturalEvent: CulturalEvent) {
    return this.http.patch('',culturalEvent); //or PUT
  }

  removeCulturalEvent(culturalEvent: CulturalEvent) {
    return this.http.delete(''); //TODO: how to specify which one should be deleted?
  }
}
