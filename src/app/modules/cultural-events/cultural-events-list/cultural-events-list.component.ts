import {Component, OnDestroy, OnInit} from '@angular/core';
import {CulturalEvent} from "../cultural-event";
import {CulturalEventService} from "../cultural-event.service";
import {catchError, delay, first, map, of, Subject, Subscription, takeUntil} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {Role} from "../../../shared/models/user.model";
import {ModalType} from "../../../shared/components/modal/modal";
import {AlertService} from "../../alert/alert.service";
import {NO_DATA_AVAILABLE} from "../../../../assets/constants";

@Component({
  selector: 'app-cultural-events-list',
  templateUrl: './cultural-events-list.component.html',
  styleUrls: ['./cultural-events-list.component.scss']
})
export class CulturalEventsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  culturalEvents: CulturalEvent[] = [];
  isLoading: boolean = false;
  spinnerNote: string = "Cultural Events are loading...";
  selectedCulturalEvent: CulturalEvent = {name: ''}
  isAuthorized: boolean = false;
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;

  constructor(private culturalEventService: CulturalEventService,
              private modalService: ModalService,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.setIsAuthorized();
  }

  loadData() {
    this.isLoading = true;
    this.culturalEventService.getEvents()
      //.pipe(delay(5000))
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: CulturalEvent[]) => { this.culturalEvents = value; },
        error: (err: any) => {
          //console.error('error during loading cultural events: ' + err);
          this.isLoading = false;
        },
        complete: () => { this.isLoading = false; }
      });
  }

  setIsAuthorized() {
    //this.authService.initAuthStatus(); // for browser refresh
    this.authService.role$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.isAuthorized = (value !== null && value !== Role.Client);
        }
      })
  }

  // CREATE CULTURAL EVENT //
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new cultural event"});
    let subscription: Subscription = this.subscribeToAddCulturalEventModalEvent();
    this.modalService.openModal(ModalType.CREATE_CULTURAL_EVENT, subscription);
  }

  subscribeToAddCulturalEventModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (culturalEvent: CulturalEvent) => {
          this.createCulturalEvent(culturalEvent);
          this.modalService.closeModal();
        }
      });
  }

  createCulturalEvent(culturalEvent: CulturalEvent) {
    this.culturalEventService.createCulturalEvent(culturalEvent)
      .subscribe({
          next: (newCulturalEvent: CulturalEvent) => { this.culturalEvents.unshift(newCulturalEvent); },
          // error: (err) => {
          //   this.alertService.error('An error occurred during creating the cultural event.');
          // }
        });
  }

  // UPDATE CULTURAL EVENT //
  openModalUpdate(culturalEvent: CulturalEvent) {
    this.selectedCulturalEvent = culturalEvent;
    this.modalService.setConfiguration({
      title: "Update " + culturalEvent.name + " cultural event",
      data: {culturalEvent: culturalEvent}
    })
    let subscription: Subscription = this.subscribeToUpdateCulturalEventModalEvent();
    this.modalService.openModal(ModalType.UPDATE_CULTURAL_EVENT, subscription);
  }

  subscribeToUpdateCulturalEventModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: ( culturalEvent: CulturalEvent ) => {
          this.updateCulturalEvent(culturalEvent);
          this.modalService.closeModal();
        }
      });
  }

  updateCulturalEvent(culturalEvent: CulturalEvent) {
    culturalEvent.id = this.selectedCulturalEvent.id;
    this.culturalEventService.updateCulturalEvent(culturalEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (updatedCulturalEvent) => {
            let index = this.culturalEvents.findIndex(ce => ce.id === updatedCulturalEvent.id); // find index in an array
            this.culturalEvents[index] = updatedCulturalEvent;
          },
          // error: (err) => {
          //   this.alertService.error('An error occurred during updating the cultural event.');
          // }
        });
  }

  // DELETE CULTURAL EVENT //
  openModalDelete(culturalEventId: number) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "cultural event"});
    let subscription = this.subscribeToDeleteCulturalEventModalEvent(culturalEventId);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteCulturalEventModalEvent(culturalEventId: number): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if (result) { this.deleteCulturalEvent(culturalEventId); }
          this.modalService.closeModal();
        }
      });
  }

  deleteCulturalEvent(culturalEventId: number) {
    this.culturalEventService.deleteCulturalEvent(culturalEventId)
      .subscribe(
        {
          next: (id) => {
            let index = this.culturalEvents.findIndex(ce => ce.id === id); // find index in an array
            this.culturalEvents.splice(index, 1); // remove element from array
            this.alertService.success("The cultural event was deleted successfully.");
          },
          // error: (err) => {
          //   this.alertService.error("An error occurred during deleting the cultural event.", this.appError);
          // }
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
