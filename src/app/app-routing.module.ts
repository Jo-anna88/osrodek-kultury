import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
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
import {AddEmployeeFormComponent} from "./modules/about/add-employee-form/add-employee-form.component";
import {UpdateEmployeeFormComponent} from "./modules/about/update-employee-form/update-employee-form.component";
import {AddChildFormComponent} from "./core/forms/add-child-form/add-child-form.component";
import {UpdateClientFormComponent} from "./core/forms/update-client-form/update-client-form.component";
import {
  CreateCulturalEventFormComponent
} from "./modules/cultural-events/create-cultural-event-form/create-cultural-event-form.component";
import {
  UpdateCulturalEventFormComponent
} from "./modules/cultural-events/update-cultural-event-form/update-cultural-event-form.component";

const ROUTES: Routes = [
  {path: 'login', component: LoginComponent}, // for PRIMARY_OUTLET (default router with name 'primary')
  {path: 'modal', component: ModalComponent, outlet: 'modalOutlet',
    children: [
      {path: ModalType.SIGNUP, component: SignUpModalFormComponent},
      {path: ModalType.DELETE_CONFIRMATION, component: DeleteConfirmationDialogComponent},
      {path: ModalType.JOIN_CONFIRMATION, component: JoinConfirmationDialogComponent},
      {path: ModalType.CREATE_CULTURAL_EVENT, component: CreateCulturalEventFormComponent},
      {path: ModalType.UPDATE_CULTURAL_EVENT, component: UpdateCulturalEventFormComponent},
      {path: ModalType.CREATE_COURSE, component: CreateCourseFormComponent},
      {path: ModalType.UPDATE_COURSE, component: UpdateCourseFormComponent},
      {path: ModalType.CREATE_COURSE_DETAILS, component: CreateCourseDetailsFormComponent},
      {path: ModalType.UPDATE_COURSE_DETAILS, component: UpdateCourseDetailsFormComponent},
      {path: ModalType.ADD_EMPLOYEE, component: AddEmployeeFormComponent},
      {path: ModalType.UPDATE_EMPLOYEE, component: UpdateEmployeeFormComponent},
      {path: ModalType.ADD_CHILD, component: AddChildFormComponent},
      {path: ModalType.UPDATE_CLIENT_ACCOUNT, component: UpdateClientFormComponent}
    ]
  }, // for named router outlet
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

const routerExtraOptions: ExtraOptions = {
  // scrollPositionRestoration: "enabled",
  // anchorScrolling: "enabled",
  // scrollOffset: [0, 64],
  //enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, routerExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
