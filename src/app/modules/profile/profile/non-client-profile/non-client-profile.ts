import {Component, Input} from '@angular/core';
import {User} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-non-client-profile',
  templateUrl: './non-client-profile.html',
  styleUrls: ['./non-client-profile.scss']
})
export class NonClientProfile {
    @Input()
    user: User = {}

  // todo: For Teacher: it could show Schedule and give a possibility of sending Absence Info to course participants
}
