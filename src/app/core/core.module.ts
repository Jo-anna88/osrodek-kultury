import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // LowerCasePipe, NgForOf, NgIf
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from './authorization/login/login.component';
import {SignUpModalFormComponent} from "./authorization/sign-up-modal-form/sign-up-modal-form.component";

import {SharedModule} from "../shared/shared.module";
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { AboutDropdownComponent } from './about-dropdown/about-dropdown.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        SignUpModalFormComponent,
        UserDropdownComponent,
        AboutDropdownComponent
    ],
  imports: [
    MatButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    SharedModule,
  ],
    exports: [
        FooterComponent,
        HeaderComponent,
    ]
})
export class CoreModule{}
