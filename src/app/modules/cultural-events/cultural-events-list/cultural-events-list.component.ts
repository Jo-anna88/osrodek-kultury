import {Component, OnDestroy, OnInit} from '@angular/core';
import {CulturalEvent} from "../cultural-event";
import {CulturalEventService} from "../cultural-event.service";
import {catchError, delay, map, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cultural-events-list',
  templateUrl: './cultural-events-list.component.html',
  styleUrls: ['./cultural-events-list.component.scss']
})
export class CulturalEventsListComponent implements OnInit, OnDestroy {

  destroy$: Subject<void> = new Subject<void>();

  culturalEvents : CulturalEvent[] = [];
  isLoading: boolean = false;
  spinnerNote: string = "Cultural Events are loading...";

  constructor(private culturalEventService : CulturalEventService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // first solution:
    this.culturalEventService.getEvents()
      //.pipe(delay(5000))
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: CulturalEvent[]) => {this.culturalEvents=value;},
        error: (err: any) => {
          console.error('error during loading cultural events: '+ err);
          this.isLoading=false;},
        complete: () => {this.isLoading=false;}

      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
