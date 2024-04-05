import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCompanyComponent } from "./about-company/about-company.component";
import { AboutTeamComponent } from "./about-team/about-team.component";
import { AboutLocationsComponent } from "./about-locations/about-locations.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";

const routes: Routes = [
  { path: 'about-company', component: AboutCompanyComponent},
  { path: 'about-team', component: AboutTeamComponent},
  { path: 'about-locations', component: AboutLocationsComponent},
  { path: 'about-team/employee/:id', component: EmployeeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
