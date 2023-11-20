import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // LowerCasePipe, NgForOf, NgIf
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from './authorization/login/login.component';
import {SharedModule} from "../shared/shared.module";
import {SignUpModule} from "../modules/sign-up/sign-up.module";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoginComponent
    ],
  imports: [
    MatButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    SharedModule,
    SignUpModule,
  ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
})
export class CoreModule{}
