import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModalFormComponent } from "./sign-up-modal-form/sign-up-modal-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    SignUpModalFormComponent
  ],
  exports: [
    SignUpModalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SignUpModule { }
