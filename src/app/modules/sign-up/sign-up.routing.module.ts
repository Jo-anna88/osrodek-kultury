import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
//import {SignUpModalComponent} from "./sign-up-modal/sign-up-modal.component";

const routes: Routes = [
  //{path: 'signup', component: SignUpModalComponent, outlet: 'modalOutlet'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {}
