import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CulturalEventsRoutingModule } from './cultural-events-routing.module';
import { CulturalEventsComponent } from './cultural-events/cultural-events.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    CulturalEventsComponent
  ],
    imports: [
        CommonModule,
        CulturalEventsRoutingModule,
        MatProgressSpinnerModule
    ]
})
export class CulturalEventsModule { }
