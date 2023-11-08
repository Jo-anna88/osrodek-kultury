import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

// import these modules to make angular material visible in other modules by importing shared
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonAddComponent } from './components/button-add/button-add.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalUserConfirmationComponent } from './components/modal-user-confirmation/modal-user-confirmation.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        DropdownComponent,
        SpinnerComponent,
        ErrorComponent,
        ButtonEditComponent,
        ButtonDeleteComponent,
        ButtonAddComponent,
        ModalComponent,
        ModalUserConfirmationComponent
    ],
  exports: [
    //FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    DropdownComponent,
    SpinnerComponent,
    ErrorComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonAddComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    //FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
