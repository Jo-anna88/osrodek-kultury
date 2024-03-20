import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-about-dropdown',
  templateUrl: './about-dropdown.component.html',
  styleUrls: ['./about-dropdown.component.scss']
})
export class AboutDropdownComponent {
  @Output()
  navToCompanyEvent = new EventEmitter();
  @Output()
  navToTeamEvent = new EventEmitter();

  navigateToCompanyPage() {
    this.navToCompanyEvent.emit();
  }
  navigateToTeamPage() {
    this.navToTeamEvent.emit();
  }
}
