import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {DashboardModule} from "../dashboard/dashboard.module";


@NgModule({
  declarations: [
    LandingPageComponent
  ],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        DashboardModule
    ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
