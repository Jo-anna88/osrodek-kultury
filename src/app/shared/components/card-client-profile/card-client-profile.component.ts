import {Component, Input} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-card-client-profile',
  templateUrl: './card-client-profile.component.html',
  styleUrls: ['./card-client-profile.component.scss']
})
export class CardClientProfileComponent {
  @Input()
  user: User = {}
}
