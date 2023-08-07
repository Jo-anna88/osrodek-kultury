import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {mockEvents} from "./events/mock-events";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents() : Observable<Array<Event>>{
    return of(mockEvents);
  }
}
