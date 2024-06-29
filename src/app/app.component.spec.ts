import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "./core/authorization/auth.service";
import {BehaviorSubject, of} from "rxjs";
import {Role} from "./shared/models/user.model";
import SpyObj = jasmine.SpyObj;
import {AlertModule} from "./modules/alert/alert.module";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CoreModule} from "./core/core.module";

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceSpy: SpyObj<AuthService>;

  let isAuthenticated$: BehaviorSubject<boolean | undefined>;
  let role$: BehaviorSubject<Role | null>;

  beforeEach(async () => {
    isAuthenticated$ = new BehaviorSubject<boolean | undefined>(undefined);
    role$ = new BehaviorSubject<Role | null>(null);

    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated$: isAuthenticated$,
      role$: role$
    });

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        //AlertModule,
        //CoreModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should init title as 'osrodek-kultury'`, () => {
    expect(component.title).toEqual('osrodek-kultury');
  });

  it(`should init isUser as false`, () => {
    expect(component.isUser).toEqual(false);
  });

  it(`should init givenRole as null`, () => {
    expect(component.givenRole).toEqual(null);
  });

  it('should set isUser to true if isAuthenticated$ from AuthService is true', () => {
    authServiceSpy.isAuthenticated$.next(true);
    fixture.detectChanges();
    expect(component.isUser).toBeTrue();
  });

  it('should set isUser to false if isAuthenticated$ from AuthService is false', () => {
    authServiceSpy.isAuthenticated$.next(false);
    fixture.detectChanges();
    expect(component.isUser).toBeFalse();
  });

  it('should leave isUser as false if isAuthenticated$ from AuthService is undefined', () => {
    authServiceSpy.isAuthenticated$.next(undefined);
    fixture.detectChanges();
    expect(component.isUser).toBeFalse();
  });

  it('should set givenRole to null if role$ from AuthService is null', () => {
    authServiceSpy.role$.next(null);
    fixture.detectChanges();
    expect(component.givenRole).toEqual(null);
  });

  it('should set givenRole to Admin if role$ is Role.Admin', () => {
    authServiceSpy.role$.next(Role.Admin);
    fixture.detectChanges();
    expect(component.givenRole).toEqual(Role.Admin);
  });
});
