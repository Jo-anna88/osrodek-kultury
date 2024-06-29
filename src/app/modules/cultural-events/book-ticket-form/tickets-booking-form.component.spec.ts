import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsBookingFormComponent } from './tickets-booking-form.component';
import {ContactComponent} from "../../contact/contact/contact.component";
import {FormsModule} from "@angular/forms";

describe('BookTicketFormComponent', () => {
  let component: TicketsBookingFormComponent;
  let fixture: ComponentFixture<TicketsBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsBookingFormComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
