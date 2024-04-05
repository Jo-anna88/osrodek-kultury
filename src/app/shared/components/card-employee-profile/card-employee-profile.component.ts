import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-card-employee-profile',
  templateUrl: './card-employee-profile.component.html',
  styleUrls: ['./card-employee-profile.component.scss']
})
export class CardEmployeeProfileComponent {
  @Input()
  user: User = {}
}
