import {Component} from '@angular/core';
import {mockNavbarItems} from "./mock-navbar-items";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: string[] = mockNavbarItems;
  constructor(private router: Router) {}
  // showPopUp() {
  //   this.router.navigate(['login']);
  // }
}
