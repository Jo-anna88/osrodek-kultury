import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./core/authorization/login/login.component";
import { ModalComponent } from "./shared/components/modal/modal.component";
import { SignUpModalFormComponent } from "./core/authorization/sign-up-modal-form/sign-up-modal-form.component";
import {
  UpdateCourseDetailsFormComponent
} from "./modules/courses/update-course-details-form/update-course-details-form.component";
import {
  DeleteConfirmationDialogComponent
} from "./shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {ModalType} from "./shared/components/modal/modal";

const ROUTES: Routes = [
  {path: 'login', component: LoginComponent}, // for PRIMARY_OUTLET (default router with name 'primary')
  {path: 'modal', component: ModalComponent, outlet: 'modalOutlet',
    children: [
      {path: ModalType.DELETE_CONFIRMATION, component: DeleteConfirmationDialogComponent},
      {path: ModalType.SIGNUP, component: SignUpModalFormComponent},
      {path: ModalType.UPDATE_COURSE_DETAILS, component: UpdateCourseDetailsFormComponent}
    ]
  }, // for named router outlet
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,
  //  {enableTracing: true}
     )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
