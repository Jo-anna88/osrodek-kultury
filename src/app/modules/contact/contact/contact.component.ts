import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  googleMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.651644817334!2d20.940973076495624!3d52.43110937203796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eb8f719c4a1b3%3A0xf759e9a701bbbafd!2sO%C5%9Brodek%20Kultury%20W%20Wieliszewie!5e0!3m2!1spl!2spl!4v1684418197056!5m2!1spl!2spl';
  url:SafeResourceUrl
  constructor(private sanitizer: DomSanitizer) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.googleMapUrl);
  }
}
