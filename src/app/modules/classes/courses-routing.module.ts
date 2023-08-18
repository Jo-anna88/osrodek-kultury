import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";

const routes: Routes = [
  { path: 'classes', component: CoursesListComponent},
  { path: 'classes/:id', component: CourseDetailComponent } //The :id token creates a slot in the path for a Route Parameter
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
