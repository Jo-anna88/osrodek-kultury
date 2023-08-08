import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule} from "./core/core.module";
import { AboutModule } from "./modules/about/about.module";
import { HomeModule } from "./modules/home/home.module";
import { ContactModule } from "./modules/contact/contact.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CulturalEventsModule} from "./modules/cultural-events/cultural-events.module";
import {ClassesModule} from "./modules/classes/classes.module";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    FontAwesomeModule,
    MatIconModule,
    NgbModule,
    MatButtonModule,
    CoreModule,
    AboutModule,
    HomeModule,
    ContactModule,
    CulturalEventsModule,
    ClassesModule,
    SharedModule,
    AppRoutingModule // it should be the last imported module (because there are routing files in other modules)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
