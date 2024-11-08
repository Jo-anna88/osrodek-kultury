import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from "@angular/common";
import localeEn from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule} from "./core/core.module";
import { AboutModule } from "./modules/about/about.module";
import { HomeModule } from "./modules/home/home.module";
import { ContactModule } from "./modules/contact/contact.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CulturalEventsModule } from "./modules/cultural-events/cultural-events.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { SharedModule } from "./shared/shared.module";
import { LandingPageModule } from "./modules/landing-page/landing-page.module";
import { AlertModule } from "./modules/alert/alert.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { ErrorHandlerService } from "./core/services/error-handler.service";
import { AppHttpInterceptor } from "./core/interceptors/app-http-interceptor.service";


// Register locale data for English
registerLocaleData(localeEn);
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    CoreModule,
    AboutModule,
    HomeModule,
    ContactModule,
    CulturalEventsModule,
    CoursesModule,
    LandingPageModule,
    AlertModule,
    ProfileModule,
    SharedModule,
    AppRoutingModule // it should be the last imported module (because there are routing files in other modules)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: LOCALE_ID, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
