import { Component } from '@angular/core';
import {CONTACT} from "../../modules/mocks/mock-contact";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    contactInfo = CONTACT;
}
