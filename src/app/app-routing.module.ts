import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./core/authorization/login/login.component";
import { ModalComponent } from "./shared/components/modal/modal.component";
import { SignUpModalFormComponent } from "./modules/sign-up/sign-up-modal-form/sign-up-modal-form.component";

const ROUTES: Routes = [
  {path: 'login', component: LoginComponent}, // for PRIMARY_OUTLET (default router with name 'primary')
  {path: 'modal', component: ModalComponent, outlet: 'modalOutlet',
    children: [
      {path: 'signup', component: SignUpModalFormComponent}
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
