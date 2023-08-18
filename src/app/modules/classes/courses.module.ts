import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import {SharedModule} from "../../shared/shared.module";
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent
  ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        SharedModule
    ]
})
export class CoursesModule { }
