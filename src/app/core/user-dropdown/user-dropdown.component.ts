import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  @Input()
  title: string = "";
  @Output()
  navToProfileEvent = new EventEmitter();
  @Output()
  logOutEvent = new EventEmitter();

  navigateToProfile() {
    this.navToProfileEvent.emit();
  }

  logOut() {
    this.logOutEvent.emit();
  }
}
