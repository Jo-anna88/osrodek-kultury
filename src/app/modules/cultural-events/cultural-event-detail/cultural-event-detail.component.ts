import {Component, OnDestroy, OnInit} from '@angular/core';
import {CulturalEventService} from "../cultural-event.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../../shared/models/user.model";
import {AuthService} from "../../../core/authorization/auth.service";
import {CulturalEvent} from "../cultural-event";

@Component({
  selector: 'app-cultural-event-detail',
  templateUrl: './cultural-event-detail.component.html',
  styleUrls: ['./cultural-event-detail.component.scss']
})
export class CulturalEventDetailComponent implements OnInit {
  isLoading: boolean = false;
  culturalEventId: number = -1;
  culturalEvent: CulturalEvent = {name:''}
  spinnerNote: string = "Cultural Event details are loading..."
  constructor (private culturalEventService: CulturalEventService,
               private route: ActivatedRoute) {}
  ngOnInit() {
    this.culturalEventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.culturalEventService.getEventById(this.culturalEventId).subscribe({
      next: (culturalEvent) => {this.culturalEvent = culturalEvent},
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    })
  }

}
