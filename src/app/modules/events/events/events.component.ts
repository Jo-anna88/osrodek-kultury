import { Component } from '@angular/core';
import {EventService} from "../event.service";
import {IEvent} from "./event";
import {delay} from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  events : Array<IEvent> = null;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    // this.eventService.getEvents()
    //   .pipe(delay(5000))
    //   .subscribe({
    //     next: (event : IEvent) => events.push(event),
    //     error: (err: any) => consle.error ('error')
    //   });

  }

}
