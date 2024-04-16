import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CulturalEventsRoutingModule } from './cultural-events-routing.module';
import { CulturalEventsListComponent } from './cultural-events-list/cultural-events-list.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "../../shared/shared.module";
import { CulturalEventDetailComponent } from './cultural-event-detail/cultural-event-detail.component';

@NgModule({
  declarations: [
    CulturalEventsListComponent,
    CulturalEventDetailComponent
  ],
  imports: [
    CommonModule,
    CulturalEventsRoutingModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class CulturalEventsModule { }
