import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {CONTACT, googleMapUrl} from "../../mocks/mock-contact";
import {ContactMessage} from "src/app/modules/contact/contact/contactMessage";
import {ContactService} from "../contact.service";
import {AlertService} from "../../alert/alert.service";
import {NgForm} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {EMAIL_PATTERN} from "../../../core/forms/form-validators";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnDestroy{
  destroy$ = new Subject<void>();
  url: SafeResourceUrl = "";
  contactInfo = CONTACT;
  contactMessage: ContactMessage = new ContactMessage();
  emailPattern : string = EMAIL_PATTERN;
  currentLength: number = 0;

  constructor(private sanitizer: DomSanitizer,
              private contactService: ContactService,
              private alertService: AlertService) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapUrl);
  }

  sendMessage(contactForm: NgForm) {
    this.contactService.sendMessage(contactForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: () => {
        this.alertService.success('The message has been sent successfully,')
      },
      error: (err: any) => {
        this.alertService.error('An error has occurred while sending email.');
      }
    });
    contactForm.resetForm();
  }

  countMessageLength(value: EventEmitter<string>) {
    this.currentLength = value ? value.length : 0; // after submitting form value will be null
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
