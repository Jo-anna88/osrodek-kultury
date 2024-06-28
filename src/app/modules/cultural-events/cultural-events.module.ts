import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CulturalEventsRoutingModule } from './cultural-events-routing.module';
import { CulturalEventsListComponent } from './cultural-events-list/cultural-events-list.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "../../shared/shared.module";
import { CulturalEventDetailComponent } from './cultural-event-detail/cultural-event-detail.component';
import { CreateCulturalEventFormComponent } from './create-cultural-event-form/create-cultural-event-form.component';
import { UpdateCulturalEventFormComponent } from './update-cultural-event-form/update-cultural-event-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TicketsBookingFormComponent } from './book-ticket-form/tickets-booking-form.component';

@NgModule({
  declarations: [
    CulturalEventsListComponent,
    CulturalEventDetailComponent,
    CreateCulturalEventFormComponent,
    UpdateCulturalEventFormComponent,
    TicketsBookingFormComponent
  ],
  imports: [
    CommonModule,
    CulturalEventsRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CulturalEventsModule { }
