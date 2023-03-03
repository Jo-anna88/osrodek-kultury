import { NgModule } from '@angular/core';
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent
    ],
    imports: [
        MatButtonModule
    ],
    exports: [
        FooterComponent,
        NavbarComponent
    ]
})
export class CoreModule{}
