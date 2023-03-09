import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {mockNavbarItems} from "./core/navbar/mock-navbar-items";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'osrodek-kultury';
  navbarItems : string[] = mockNavbarItems;

  constructor(private modalService: NgbModal) {
    console.log(this.navbarItems);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


}
