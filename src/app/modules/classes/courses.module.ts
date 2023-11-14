import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {SharedModule} from "../../shared/shared.module";
import { CourseDetailComponent } from './course-detail/course-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateUpdateModalFormComponent } from './create-update-modal-form/create-update-modal-form.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    CreateUpdateModalFormComponent
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
