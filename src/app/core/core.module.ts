import { NgModule } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {LowerCasePipe, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { LoginComponent } from './authorization/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LoginComponent
    ],
  imports: [
    MatButtonModule,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    LowerCasePipe,
    ReactiveFormsModule
  ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
})
export class CoreModule{}
