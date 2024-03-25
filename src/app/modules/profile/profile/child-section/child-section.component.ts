import {Component, Input} from '@angular/core';
import {User} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-child-section',
  templateUrl: './child-section.component.html',
  styleUrls: ['./child-section.component.scss']
})
export class ChildSectionComponent {
  @Input()
  child: User = {}
}
