import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
