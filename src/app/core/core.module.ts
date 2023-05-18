import { NgModule } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {LowerCasePipe, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent
    ],
  imports: [
    MatButtonModule,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    LowerCasePipe
  ],
    exports: [
        FooterComponent,
        HeaderComponent
    ]
})
export class CoreModule{}
