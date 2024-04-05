import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutCompanyComponent } from './about-company/about-company.component';
import {SharedModule} from "../../shared/shared.module";
import { AboutTeamComponent } from './about-team/about-team.component';
import { AboutLocationsComponent } from './about-locations/about-locations.component';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { UpdateEmployeeFormComponent } from './update-employee-form/update-employee-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AboutCompanyComponent,
    AboutTeamComponent,
    AboutLocationsComponent,
    AddEmployeeFormComponent,
    UpdateEmployeeFormComponent,
    EmployeeDetailComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AboutModule { }
