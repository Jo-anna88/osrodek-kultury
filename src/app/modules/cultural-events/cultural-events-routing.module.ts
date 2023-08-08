import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CulturalEventsComponent} from "./cultural-events/cultural-events.component";

const routes: Routes = [
  { path: 'events', component: CulturalEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulturalEventsRoutingModule { }
