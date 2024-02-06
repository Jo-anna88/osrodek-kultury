import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';


@NgModule({
  declarations: [
    DashboardClientComponent,
    DashboardAdminComponent,
    DashboardEmployeeComponent
  ],
  exports: [
    DashboardClientComponent,
    DashboardAdminComponent,
    DashboardEmployeeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
