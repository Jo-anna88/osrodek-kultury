import {Component, EventEmitter} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CONTACT, googleMapUrl} from "../../mocks/mock-contact";
import {ContactMessage} from "src/app/modules/contact/contact/contactMessage";
import {EMAIL_PATTERN} from "../../../../assets/constants";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  url: SafeResourceUrl = "";
  contactInfo = CONTACT;
  contactMessage: ContactMessage = new ContactMessage();
  submitted : boolean = false; // ?
  isSendingEnabled : boolean = false;
  emailPattern : string = EMAIL_PATTERN;
  currentLength: number = 0;

  constructor(private sanitizer: DomSanitizer, private contactService: ContactService) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapUrl);
  }

  sendMessage(contactFormValue: ContactMessage) {
    this.contactMessage = contactFormValue;
    console.log(this.contactMessage); // maybe we could send it as a json?
    this.contactService.sendMessage(this.contactMessage);
  }
  onSubmit() {
    this.submitted = true;
  } // ?
  countMessageLength(value: EventEmitter<string>) {
    this.currentLength=value.length;
  }
}
