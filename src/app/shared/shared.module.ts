import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    declarations: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
