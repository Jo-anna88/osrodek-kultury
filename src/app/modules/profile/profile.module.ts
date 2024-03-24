import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ClientProfileComponent } from './profile/client-profile/client-profile.component';
import {DashboardModule} from "../dashboard/dashboard.module";
import { NonClientProfile } from './profile/non-client-profile/non-client-profile';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProfileComponent,
    ClientProfileComponent,
    NonClientProfile
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DashboardModule,
    SharedModule
  ]
})
export class ProfileModule { }
