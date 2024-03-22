import {Component, Input} from '@angular/core';
import {EmployeeProfile} from "./profile-model";

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss']
})
export class CardProfileComponent {
  @Input()
  profile: EmployeeProfile = {}
}
