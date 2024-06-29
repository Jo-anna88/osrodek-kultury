import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalEventsListComponent } from './cultural-events-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CulturalEventService} from "../cultural-event.service";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {AlertService} from "../../alert/alert.service";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../../shared/models/user.model";

describe('CulturalEventsListComponent', () => {
  let component: CulturalEventsListComponent;
  let fixture: ComponentFixture<CulturalEventsListComponent>;

  let culturalEventServiceSpy: jasmine.SpyObj<CulturalEventService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let authServiceStub: Partial<AuthService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  /*
  "In order to create a mock with multiple spies, use jasmine.createSpyObj and pass an array of strings.
  It returns an object that has a property for each string that is a spy."
    source: source: https://jasmine.github.io/tutorials/your_first_suite
   */
  beforeEach(async () => {
    culturalEventServiceSpy = jasmine.createSpyObj('CulturalEventService',
      ['getEvents', 'createCulturalEvent', 'updateCulturalEvent', 'deleteCulturalEvent']);
    modalServiceSpy = jasmine.createSpyObj('ModalService',
      ['setConfiguration', 'openModal', 'closeModal', 'getModalEvent']);
    alertServiceSpy = jasmine.createSpyObj('AlertService',
      ['success', 'error']);
    authServiceStub = {
      role$: new BehaviorSubject<Role | null>(Role.Client)
    };

    await TestBed.configureTestingModule({
      declarations: [ CulturalEventsListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CulturalEventService, useValue: culturalEventServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
