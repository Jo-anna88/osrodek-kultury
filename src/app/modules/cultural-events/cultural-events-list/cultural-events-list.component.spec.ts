import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CulturalEventsListComponent } from './cultural-events-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CulturalEventService} from "../cultural-event.service";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {AlertService} from "../../alert/alert.service";
import {BehaviorSubject, of, Subscription, throwError} from "rxjs";
import {Role} from "../../../shared/models/user.model";
import {CulturalEvent} from "../cultural-event.model";
import {mockCulturalEvents} from "../mock-cultural-events";
import {NO_ERRORS_SCHEMA} from "@angular/core";

fdescribe('CulturalEventsListComponent', () => {
  let component: CulturalEventsListComponent;
  let fixture: ComponentFixture<CulturalEventsListComponent>;

  let culturalEventServiceSpy: jasmine.SpyObj<CulturalEventService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let authServiceStub: Partial<AuthService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  const mockCulturalEvents_: CulturalEvent[] = mockCulturalEvents;
  const updatedCulturalEvent: CulturalEvent = {...mockCulturalEvents_[0], maxParticipantsNumber: 1000}

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
      role$: new BehaviorSubject<Role | null>(Role.Employee)
    };

    await TestBed.configureTestingModule({
      declarations: [ CulturalEventsListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CulturalEventService, useValue: culturalEventServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: AuthService, useValue: authServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalEventsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadData() and setIsAuthorized()', () => {
      spyOn(component, 'loadData');
      spyOn(component, 'setIsAuthorized');

      component.ngOnInit();

      expect(component.loadData).toHaveBeenCalledTimes(1);
      expect(component.setIsAuthorized).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadData', () => {
    it('should call getEvents() from CulturalEventsService and set culturalEvents', fakeAsync(() => {
      culturalEventServiceSpy.getEvents.and.returnValue(of(mockCulturalEvents_));

      component.loadData();
      tick();

      expect(component.culturalEvents).toEqual(mockCulturalEvents_);
      expect(component.isLoading).toBeFalse();
    }));

    it('should call getEvents() from CulturalEventsService and culturalEvents should stay as an empty array' +
      ' in case of error', fakeAsync(() => {
      culturalEventServiceSpy.getEvents.and.returnValue(throwError(() => new Error('Error occurred')));

      component.loadData();
      tick();

      expect(component.culturalEvents).toEqual([]);
      expect(component.isLoading).toBeFalse();
    }));
  });

  describe('setIsAuthorized', () => {
    it('should set isAuthorized to true if user role is Admin or Employee', fakeAsync(()=> {

      component.setIsAuthorized();
      tick();

      expect(component.isAuthorized).toBeTrue();
    }));

    it('should set isAuthorized to false if user role is Client', fakeAsync(() => {
      authServiceStub.role$!.next(Role.Client);

      component.setIsAuthorized();
      tick();

      expect(component.isAuthorized).toBeFalse();
    }));

    it('should set isAuthorized to false if user has NO role', fakeAsync(()=> {
      spyOn(component, 'loadData');
      authServiceStub.role$!.next(null);

      component.setIsAuthorized();
      tick();

      expect(component.isAuthorized).toBeFalse();
    }));
  });

  describe('openModalCreate', () => {
    it('should call setConfiguration() and openModal() methods from ModalService and subscribeToAddCulturalEventModalEvent() method', () => {
      spyOn(component, 'subscribeToAddCulturalEventModalEvent');

      component.openModalCreate();

      expect(modalServiceSpy.setConfiguration).toHaveBeenCalled();
      expect(component.subscribeToAddCulturalEventModalEvent).toHaveBeenCalled();
      expect(modalServiceSpy.openModal).toHaveBeenCalled();
    });
  });

  describe('subscribeToAddCulturalEventModalEvent', () => {
    it('should call createModalEvent and closeModal from ModalService', fakeAsync(() => {
      modalServiceSpy.getModalEvent.and.returnValue(of(mockCulturalEvents_[0]));
      spyOn(component, 'createCulturalEvent');

      let result: Subscription = component.subscribeToAddCulturalEventModalEvent();
      tick();

      expect(component.createCulturalEvent).toHaveBeenCalledWith(mockCulturalEvents_[0]);
      expect(modalServiceSpy.closeModal).toHaveBeenCalled();
      expect(result.closed).toBeTrue();
    }));
  });

  describe('createCulturalEvent', () => {
    it('should call createCulturalEvent from CulturalEventService and add result to the beginning of the culturalEvents array.', fakeAsync(() => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      let initialArrayLength = component.culturalEvents.length;
      culturalEventServiceSpy.createCulturalEvent.and.returnValue(of(mockCulturalEvents_[1]))

      component.createCulturalEvent(mockCulturalEvents_[1]);
      tick();

      expect(component.culturalEvents.length).toBe(++initialArrayLength);
      expect(component.culturalEvents[0]).toBe(mockCulturalEvents_[1]);
    }));
  });

  describe('openModalUpdate', () => {
    it('should set selectedCulturalEvent, call setConfiguration() and openModal() methods from ModalService and subscribeToUpdateCulturalEventModalEvent() method', () => {
      spyOn(component, 'subscribeToUpdateCulturalEventModalEvent');

      component.openModalUpdate(mockCulturalEvents_[0]);

      expect(component.selectedCulturalEvent).toEqual(mockCulturalEvents_[0]);
      expect(modalServiceSpy.setConfiguration).toHaveBeenCalled();
      expect(component.subscribeToUpdateCulturalEventModalEvent).toHaveBeenCalled();
      expect(modalServiceSpy.openModal).toHaveBeenCalled();
    });
  });

  describe('subscribeToUpdateCulturalEventModalEvent', () => {
    it('should call updateCulturalEvent and closeModal from ModalService', fakeAsync(() => {
      modalServiceSpy.getModalEvent.and.returnValue(of(updatedCulturalEvent));
      spyOn(component, 'updateCulturalEvent');

      let result: Subscription = component.subscribeToUpdateCulturalEventModalEvent();
      tick();

      expect(component.updateCulturalEvent).toHaveBeenCalledWith(updatedCulturalEvent);
      expect(modalServiceSpy.closeModal).toHaveBeenCalled();
      expect(result.closed).toBeTrue();
    }));
  });

  describe('updateCulturalEvent', () => {
    it('should call updateCulturalEvent from CulturalEventService and add result to the beginning of the culturalEvents array.', fakeAsync(() => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      let initialArrayLength: number = component.culturalEvents.length;
      component.selectedCulturalEvent.id = mockCulturalEvents_[0].id;
      culturalEventServiceSpy.updateCulturalEvent.and.returnValue(of(updatedCulturalEvent))

      component.updateCulturalEvent(updatedCulturalEvent);
      tick();

      expect(component.culturalEvents.length).toBe(initialArrayLength);
      expect(component.culturalEvents[0]).toEqual(updatedCulturalEvent);
    }));
  });

  describe('openModalDelete', () => {
    it('should call setConfiguration() and openModal() methods from ModalService and subscribeToDeleteCulturalEventModalEvent() method', () => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      const culturalEventId: number = mockCulturalEvents_[0].id!;
      spyOn(component, 'subscribeToDeleteCulturalEventModalEvent');

      component.openModalDelete(culturalEventId);

      expect(modalServiceSpy.setConfiguration).toHaveBeenCalled();
      expect(component.subscribeToDeleteCulturalEventModalEvent).toHaveBeenCalledWith(culturalEventId);
      expect(modalServiceSpy.openModal).toHaveBeenCalled();
    });
  });

  describe('subscribeToDeleteCulturalEventModalEvent', () => {
    it('should call deleteCulturalEvent if getModalEvent returns TRUE and closeModal from ModalService', fakeAsync(() => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      const culturalEventId: number = mockCulturalEvents_[0].id!;
      modalServiceSpy.getModalEvent.and.returnValue(of(true));
      spyOn(component, 'deleteCulturalEvent');

      let result: Subscription = component.subscribeToDeleteCulturalEventModalEvent(culturalEventId);
      tick();

      expect(component.deleteCulturalEvent).toHaveBeenCalledWith(culturalEventId);
      expect(modalServiceSpy.closeModal).toHaveBeenCalled();
      expect(result.closed).toBeTrue();
    }));

    it('should NOT call deleteCulturalEvent if getModalEvent returns FALSE and should call closeModal from ModalService', fakeAsync(() => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      const culturalEventId: number = mockCulturalEvents_[0].id!;
      modalServiceSpy.getModalEvent.and.returnValue(of(false));
      spyOn(component, 'deleteCulturalEvent');

      let result: Subscription = component.subscribeToDeleteCulturalEventModalEvent(culturalEventId);
      tick();

      expect(component.deleteCulturalEvent).not.toHaveBeenCalled();
      expect(modalServiceSpy.closeModal).toHaveBeenCalled();
      expect(result.closed).toBeTrue();
    }));
  });

  describe('deleteCulturalEvent', () => {
    it('should call deleteCulturalEvent from CulturalEventService, remove the selected culturalEvent' +
      ' from the culturalEvents array by id and call success() from AlertService.', fakeAsync(() => {
      component.culturalEvents = Array.of(mockCulturalEvents_[0]);
      let initialArrayLength: number = component.culturalEvents.length;
      const culturalEventId: number = mockCulturalEvents_[0].id!;
      culturalEventServiceSpy.deleteCulturalEvent.and.returnValue(of(culturalEventId));

      component.deleteCulturalEvent(culturalEventId);
      tick();

      expect(component.culturalEvents.length).toBe(--initialArrayLength);
      let index = component.culturalEvents.findIndex(ce => ce.id === culturalEventId);
      expect(index).toBe(-1);
      expect(alertServiceSpy.success).toHaveBeenCalled();
    }));
  });

  describe('ngOnDestroy', () => {
    it('should call next() and complete() on destroy$', () => {
      const nextSpy = spyOn(component.destroy$, 'next');
      const completeSpy = spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
