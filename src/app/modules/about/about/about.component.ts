import { Component } from '@angular/core';
import { SIMPLE_TEXT } from "../../../../assets/constants";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  ourMission : string = SIMPLE_TEXT;
  ourStory : string = SIMPLE_TEXT;
  ourHistory : string = SIMPLE_TEXT;
}
