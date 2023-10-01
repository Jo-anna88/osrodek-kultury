import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AlertListComponent } from './alert-list/alert-list.component';



@NgModule({
  declarations: [
    AlertComponent,
    AlertListComponent
  ],
    exports: [
        AlertComponent,
        AlertListComponent
    ],
  imports: [
    CommonModule
  ]
})
export class AlertModule { }
