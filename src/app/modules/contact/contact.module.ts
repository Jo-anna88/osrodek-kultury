import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import {ContactService} from "./contact.service";


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ContactService
  ]
})
export class ContactModule { }
