import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CulturalEventsListComponent} from "./cultural-events-list/cultural-events-list.component";
import {CulturalEventDetailComponent} from "./cultural-event-detail/cultural-event-detail.component";

const routes: Routes = [
  { path: 'events', component: CulturalEventsListComponent },
  { path: 'events/:id', component: CulturalEventDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturalEventsRoutingModule { }
