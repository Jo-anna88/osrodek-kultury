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
import { CardTeamMemberProfileComponent } from './components/card-team-member-profile/card-team-member-profile.component';
import { CardLocation } from './components/card-location/card-location';
import { CardClientProfileComponent } from './components/card-client-profile/card-client-profile.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { CardEmployeeProfileComponent } from './components/card-employee-profile/card-employee-profile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        ErrorComponent,
        ButtonEditComponent,
        ButtonDeleteComponent,
        ButtonAddComponent,
        ModalComponent,
        DeleteConfirmationDialogComponent,
        CardLocation,
        CardTeamMemberProfileComponent,
        CardClientProfileComponent,
        CardEmployeeProfileComponent,
        MenuComponent,
        MenuItemComponent,
        SearchBarComponent
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
    CardLocation,
    CardTeamMemberProfileComponent,
    CardClientProfileComponent,
    CardEmployeeProfileComponent,
    MenuComponent,
    MenuItemComponent,
    SearchBarComponent
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
