import {Component, OnInit} from '@angular/core';
import {Address} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {SPINNER_NOTE_DEFAULT} from "../../../../assets/constants";

@Component({
  selector: 'app-about-locations',
  templateUrl: './about-locations.component.html',
  styleUrls: ['./about-locations.component.scss']
})
export class AboutLocationsComponent implements OnInit {
    addresses: Address[] = [];
    isLoading: boolean = false;
    spinnerNote: string = SPINNER_NOTE_DEFAULT;

    constructor(private addressService: AddressService){}
    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.isLoading = true;
      this.addressService.getAddresses()
        .subscribe({
          next: (value) => {this.addresses = value;},
          error: (err) => {this.isLoading = false;},
          complete: () => {this.isLoading = false;}
        })
    }
}
