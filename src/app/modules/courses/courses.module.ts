import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {SharedModule} from "../../shared/shared.module";
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UpdateCourseDetailsFormComponent } from './update-course-details-form/update-course-details-form.component';
import { CreateCourseDetailsFormComponent } from './create-course-details-form/create-course-details-form.component';
import { CreateCourseFormComponent } from './create-course-form/create-course-form.component';
import { UpdateCourseFormComponent } from './update-course-form/update-course-form.component';
import { JoinConfirmationDialogComponent } from './join-confirmation-dialog/join-confirmation-dialog.component';
import { CoursesFiltersComponent } from './courses-filters/courses-filters.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    UpdateCourseDetailsFormComponent,
    CreateCourseDetailsFormComponent,
    CreateCourseFormComponent,
    UpdateCourseFormComponent,
    JoinConfirmationDialogComponent,
    CoursesFiltersComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
