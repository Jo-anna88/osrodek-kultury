import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCompanyComponent } from "./about-company/about-company.component";
import {AboutTeamComponent} from "./about-team/about-team.component";

const routes: Routes = [
  { path: 'about-company', component: AboutCompanyComponent},
  { path: 'about-team', component: AboutTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
