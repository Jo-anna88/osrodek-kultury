import {Component, OnInit} from '@angular/core';
import {Address} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";

@Component({
  selector: 'app-about-locations',
  templateUrl: './about-locations.component.html',
  styleUrls: ['./about-locations.component.scss']
})
export class AboutLocationsComponent implements OnInit {
    addresses: Address[] = [];

    constructor(private addressService: AddressService){}
    ngOnInit() {
      this.loadData();
    }

    loadData() {
      this.addressService.getAddresses()
        .subscribe({
          next: (value) => {this.addresses = value}
        })
    }
}
