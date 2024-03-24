import {Component, OnDestroy, OnInit} from '@angular/core';
import {CulturalEvent} from "./cultural-event";
import {CulturalEventService} from "../cultural-event.service";
import {catchError, delay, map, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cultural-events',
  templateUrl: './cultural-events.component.html',
  styleUrls: ['./cultural-events.component.scss']
})
export class CulturalEventsComponent implements OnInit, OnDestroy {

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
      .pipe(takeUntil(this.destroy$))
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: CulturalEvent[]) => {this.culturalEvents=value;},
        error: (err: any) => {
          console.error('error during loading cultural events: '+ err);
          this.isLoading=false;},
        complete: () => {this.isLoading=false;}

      })
    // // second solution:
    // this.culturalEventService.getEvents()
    //   .pipe( //Observable<ICulturalEvent[]>
    //     delay(5000),
    //     catchError((error) => {
    //       alert("error during loading cultural events " + error);
    //       this.isLoading = false;
    //       return of(error);
    //     }),
    //     map(
    //       (data: ICulturalEvent[]) => {this.culturalEvents = data})
    //   )
    //   .subscribe({
    //     next: () => this.isLoading = false
    //   });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
