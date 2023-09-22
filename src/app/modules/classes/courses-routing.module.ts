import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";

const routes: Routes = [
  { path: 'classes', component: CoursesListComponent},
  // The router embedded the id value in the navigation URL
  // because you had defined it as a route parameter with an :id placeholder token in the route path.
  // The :id token creates a slot in the path for a Route Parameter
  { path: 'classes/:id', component: CourseDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
