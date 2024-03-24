import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";

// import these modules to make angular material visible in other modules by importing shared
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonAddComponent } from './components/button-add/button-add.component';
import { ModalComponent } from './components/modal/modal.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { CardLocation } from './components/card-location/card-location';
import { CardClientProfileComponent } from './components/card-client-profile/card-client-profile.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        ErrorComponent,
        ButtonEditComponent,
        ButtonDeleteComponent,
        ButtonAddComponent,
        ModalComponent,
        DeleteConfirmationDialogComponent,
        CardProfileComponent,
        CardLocation,
        CardClientProfileComponent,
        MenuComponent,
        MenuItemComponent
    ],
  exports: [
    //FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent,
    ErrorComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    ButtonAddComponent,
    ModalComponent,
    DeleteConfirmationDialogComponent,
    CardProfileComponent,
    CardClientProfileComponent,
    MenuComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        //FontAwesomeModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        RouterOutlet
    ]
})
export class SharedModule { }
