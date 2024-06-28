import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Booking} from "../../shared/models/booking.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl: string = environment.baseUrl + '/api/booking'
  constructor(private http: HttpClient) { }

  bookTicket(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  cancelBooking(bookingId: number) {
    return this.http.delete(this.apiUrl + '/' + bookingId);
  }

  getUserBookings(): Observable<Array<Booking>> {
    //return of(mockCulturalEvents);
    return this.http.get<Array<Booking>>(this.apiUrl);
  }
}
