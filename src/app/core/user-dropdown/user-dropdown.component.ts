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
  onTitleClickEvent = new EventEmitter();
  @Output()
  navToProfileEvent = new EventEmitter();
  @Output()
  logOutEvent = new EventEmitter();

  onTitleClick() {
    this.onTitleClickEvent.emit();
  }
  navigateToProfile() {
    this.navToProfileEvent.emit();
  }

  logOut() {
    this.logOutEvent.emit();
  }
}
