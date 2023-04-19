import {Component} from '@angular/core';
import {mockNavbarItems} from "./mock-navbar-items";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: string[] = mockNavbarItems;
}
