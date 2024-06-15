import { Component } from '@angular/core';
import { SIMPLE_TEXT } from "../../../../assets/constants";


@Component({
  selector: 'app-about',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.scss']
})
export class AboutCompanyComponent {
  ourMission : string = SIMPLE_TEXT;
  ourStory : string = SIMPLE_TEXT;
  ourValues : string = SIMPLE_TEXT;
}
