import { NgModule } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent
    ],
  imports: [
    MatButtonModule,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
    exports: [
        FooterComponent,
        NavbarComponent
    ]
})
export class CoreModule{}
