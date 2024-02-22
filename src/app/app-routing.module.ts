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
import {CreateCourseFormComponent} from "./modules/courses/create-course-form/create-course-form.component";
import {UpdateCourseFormComponent} from "./modules/courses/update-course-form/update-course-form.component";
import {
  CreateCourseDetailsFormComponent
} from "./modules/courses/create-course-details-form/create-course-details-form.component";
import {
  JoinConfirmationDialogComponent
} from "./modules/courses/join-confirmation-dialog/join-confirmation-dialog.component";

const ROUTES: Routes = [
  {path: 'login', component: LoginComponent}, // for PRIMARY_OUTLET (default router with name 'primary')
  {path: 'modal', component: ModalComponent, outlet: 'modalOutlet',
    children: [
      {path: ModalType.DELETE_CONFIRMATION, component: DeleteConfirmationDialogComponent},
      {path: ModalType.SIGNUP, component: SignUpModalFormComponent},
      {path: ModalType.CREATE_COURSE, component: CreateCourseFormComponent},
      {path: ModalType.UPDATE_COURSE, component: UpdateCourseFormComponent},
      {path: ModalType.CREATE_COURSE_DETAILS, component: CreateCourseDetailsFormComponent},
      {path: ModalType.UPDATE_COURSE_DETAILS, component: UpdateCourseDetailsFormComponent},
      {path: ModalType.JOIN_CONFIRMATION, component: JoinConfirmationDialogComponent}
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
