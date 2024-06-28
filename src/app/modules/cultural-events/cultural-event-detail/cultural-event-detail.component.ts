import {Component, OnInit} from '@angular/core';
import {CulturalEventService} from "../cultural-event.service";
import {ActivatedRoute} from "@angular/router";
import {CulturalEvent} from "../cultural-event.model";
import {NO_DATA_AVAILABLE} from "../../../../assets/constants";
import {first, forkJoin, Subject, Subscription, takeUntil} from "rxjs";
import {Role} from "../../../shared/models/user.model";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {Booking} from "../../../shared/models/booking.model";
import {BookingService} from "../../../core/services/booking.service";
import {AlertService} from "../../alert/alert.service";

@Component({
  selector: 'app-cultural-event-detail',
  templateUrl: './cultural-event-detail.component.html',
  styleUrls: ['./cultural-event-detail.component.scss']
})
export class CulturalEventDetailComponent implements OnInit {
  destroy$ = new Subject<void>();
  isLoading: boolean = false;
  culturalEventId: number = -1;
  culturalEvent: CulturalEvent = {name:''};
  freeSlots: number = -1;
  isClient: boolean = false;
  spinnerNote: string = "Cultural Event details are loading..."
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;

  constructor (private culturalEventService: CulturalEventService,
               private route: ActivatedRoute,
               private bookingService: BookingService,
               private alertService: AlertService,
               private modalService: ModalService,
               private authService: AuthService) {}

  ngOnInit() {
    this.culturalEventId = +this.route.snapshot.paramMap.get('id')!;
    this.setIsAuthorized();
    this.loadData();
  }

  setIsAuthorized() {
    // this.authService.initAuthStatus(); // for browser refresh
    this.authService.role$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.isClient = (value !== null && value === Role.Client);
        }
      })
  }

  loadData() {
    this.isLoading = true;
    forkJoin([
      this.culturalEventService.getEventById(this.culturalEventId),
      this.culturalEventService.getFreeSlots(this.culturalEventId)
    ]).subscribe({
      next: ([culturalEvent, freeSlots]) => {
        this.culturalEvent = culturalEvent;
        this.freeSlots = freeSlots;
      },
      error: (err) => { this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  openBookingDialog(culturalEventName: string) {
    this.modalService.setConfiguration({title: "Booking data", data: culturalEventName});
    let subscription = this.subscribeToBookingModalEvent();
    this.modalService.openModal(ModalType.BOOKING, subscription);
  }

  private subscribeToBookingModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (numberOfTickets: number) => {
          this.bookTicket(numberOfTickets);
          this.modalService.closeModal();
        }
      });
  }

  bookTicket(numberOfTickets: number) {
    let booking: Booking = {culturalEventId: this.culturalEventId, numberOfTickets: numberOfTickets};
    this.bookingService.bookTicket(booking).subscribe({
      next: (booking: Booking) => {
        this.alertService.success(
          "Booking " + booking.numberOfTickets +" ticket(s) for " + this.culturalEvent.name + " completed successfully.");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
