import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [
        DropdownComponent,
        SpinnerComponent,
        ErrorComponent
    ],
    exports: [
        DropdownComponent,
        SpinnerComponent,
        ErrorComponent
    ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
