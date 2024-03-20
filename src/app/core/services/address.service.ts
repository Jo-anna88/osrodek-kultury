import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../shared/models/address.model";
import {AppLocation} from "../../shared/models/address.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl: string = environment.baseUrl + '/api/address';
  constructor(private http: HttpClient) { }

  getAddresses(): Observable<Array<Address>> {
      return this.http.get<Array<Address>>(this.apiUrl)
        .pipe(
          map(addresses => addresses.map(address => {return {...address}}))
        );
  }

  getLocations(): Observable<Array<AppLocation>> {
    return this.http.get<Array<AppLocation>>(this.apiUrl + "/locations")
      .pipe(
        map(locations => locations.map(location => {return {...location}}))
      );
  }
}
