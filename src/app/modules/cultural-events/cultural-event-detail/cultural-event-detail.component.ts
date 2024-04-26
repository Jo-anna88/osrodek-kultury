import {Component, OnInit} from '@angular/core';
import {CulturalEventService} from "../cultural-event.service";
import {ActivatedRoute} from "@angular/router";
import {CulturalEvent} from "../cultural-event";
import {NO_DATA_AVAILABLE} from "../../../../assets/constants";

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
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;

  constructor (private culturalEventService: CulturalEventService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.culturalEventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.culturalEventService.getEventById(this.culturalEventId).subscribe({
      next: (culturalEvent) => { this.culturalEvent = culturalEvent },
      error: (err) => { this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    })
  }
}
