import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-about-dropdown',
  templateUrl: './about-dropdown.component.html',
  styleUrls: ['./about-dropdown.component.scss']
})
export class AboutDropdownComponent {
  items: string[] = ["Company", "Team", "Locations"];

  @Output()
  navToCompanyEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  navToTeamEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  navToLocationsEvent: EventEmitter<number> = new EventEmitter();

  @Input()
  selected: number = -1;

  navigateByIndex(i: number) {
    switch(i) {
      case 0: { // Company
        this.navToCompanyEvent.emit(i);
        break;
      }
      case 1: { // Team
        this.navToTeamEvent.emit(i);
        break;
      }
      case 2: { // Locations
        this.navToLocationsEvent.emit(i);
        break;
      }
      default: break;
    }
  }
}
