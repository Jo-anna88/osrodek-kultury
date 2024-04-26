import {Component, Input} from '@angular/core';
import {EmployeeProfile} from "../../models/profile.model";

@Component({
  selector: 'app-card-team-member-profile',
  templateUrl: './card-team-member-profile.component.html',
  styleUrls: ['./card-team-member-profile.component.scss']
})
export class CardTeamMemberProfileComponent {
  @Input()
  profile: EmployeeProfile = {}
}
