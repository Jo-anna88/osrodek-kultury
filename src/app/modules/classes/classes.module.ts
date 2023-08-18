import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes/classes.component';
import {SharedModule} from "../../shared/shared.module";
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [
    ClassesComponent,
    CourseDetailComponent
  ],
    imports: [
        CommonModule,
        ClassesRoutingModule,
        SharedModule
    ]
})
export class ClassesModule { }
