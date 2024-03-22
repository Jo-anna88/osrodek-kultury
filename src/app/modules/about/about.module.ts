import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutCompanyComponent } from './about-company/about-company.component';
import {SharedModule} from "../../shared/shared.module";
import { AboutTeamComponent } from './about-team/about-team.component';
import { AboutLocationsComponent } from './about-locations/about-locations.component';

@NgModule({
  declarations: [
    AboutCompanyComponent,
    AboutTeamComponent,
    AboutLocationsComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        SharedModule
    ]
})
export class AboutModule { }
