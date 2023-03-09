import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule} from "./core/core.module";
import { AboutModule } from "./modules/about/about.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MatIconModule,
    NgbModule,
    MatButtonModule,
    CoreModule,
    AboutModule,
    AppRoutingModule // it should be the last imported module (because there are routing files in other modules)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
