import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalTestService} from "./modal-test.service";

// https://jasonwatmore.com/post/2023/01/03/angular-14-modal-popup-dialog-tutorial-with-example

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss']
})
export class ModalTestComponent implements OnInit, OnDestroy {
  @Input()
  id?: string;
  isOpen = false;
  private element: any;
  constructor(private modalService: ModalTestService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service, so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'app-modal-test') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-test-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-test-open');
    this.isOpen = false;
  }
}
