import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        DropdownComponent,
        SpinnerComponent
    ],
    exports: [
        DropdownComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
