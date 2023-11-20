import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../core/services/modal.service";
import {ModalConfiguration} from "./modal";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input()
  isClosable: boolean = true;
  @Input()
  title: string = "";
  isTitle: boolean = false;
  @Output()
  onModalClose = new EventEmitter(); // it is not needed anymore
  subscription = new Subscription();
  constructor (private renderer: Renderer2,
               private router: Router,
               private modalService: ModalService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.setClickOutsideModalListener(); // because by default the modal is closable
    this.subscription = this.modalService.getConfiguration().subscribe({
      next: (config: ModalConfiguration) => { // if there is no configuration config = {}
        if (config.isClosable === false) {
          this.isClosable = false;
          removeEventListener('click', () => {});
        }
        if (config.title) {
          this.title = config.title;
          this.isTitle = true;
        }
      }
    })
  }

  setClickOutsideModalListener() {
    if(this.isClosable) {
      addEventListener('click', (el: any) => {
        if (el.target!.localName === 'app-modal') {
          this.close();
          // this.renderer.setStyle(el.target, 'display', 'none');
        }
      });
    }
  }

  close() {
    this.onModalClose.emit(); // it is not needed anymore
    removeEventListener('click', () => {});
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
  }

  ngOnDestroy() {
    removeEventListener('click', () => {});
    this.subscription.unsubscribe();
  }
}
