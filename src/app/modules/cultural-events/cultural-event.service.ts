import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {mockCulturalEvents} from "./cultural-events/mock-cultural-events";
import {ICulturalEvent} from "./cultural-events/cultural-event";

@Injectable({
  providedIn: 'root'
})
export class CulturalEventService {
  private api = "http://localhost:4200/events";

  constructor() { }

  getEvents() : Observable<Array<ICulturalEvent>>{
    return of(mockCulturalEvents);
  }
}
