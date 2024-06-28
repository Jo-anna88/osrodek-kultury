import { Component } from '@angular/core';
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-tickets-booking-form',
  templateUrl: './tickets-booking-form.component.html',
  styleUrls: ['./tickets-booking-form.component.scss']
})
export class TicketsBookingFormComponent {
  numberOfTickets: number = 1; // default value for number of tickets

  constructor(private modalService: ModalService) {}

  bookTickets() {
    console.log(this.numberOfTickets);
    this.modalService.emitModalEvent(this.numberOfTickets);
  }

  // close() {
  //   this.modalService.closeModal();
  // }
}
