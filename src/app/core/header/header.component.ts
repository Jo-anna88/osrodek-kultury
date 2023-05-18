import {Component} from '@angular/core';
import {mockNavbarItems} from "./mock-navbar-items";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: string[] = mockNavbarItems;
}
