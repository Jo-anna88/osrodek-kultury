import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassesComponent} from "./classes/classes.component";

const routes: Routes = [
  { path: 'classes', component: ClassesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
