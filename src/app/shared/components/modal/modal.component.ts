import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ModalService} from "../../../core/services/modal.service";
import {ModalConfiguration} from "./modal";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  isClosable: boolean = true;
  title: string = "";
  isTitle: boolean = false;
  subscription = new Subscription();
  private handleDocumentClick = (event: MouseEvent) => {
    console.log("event target: ", event.target);
    if ((event.target as HTMLElement).localName === 'app-modal') {
      this.close();
      // this.renderer.setStyle(el.target, 'display', 'none'); // renderer: Renderer2
    }
  };

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.setClickOutsideModalListener(); // because by default the modal is closable (there could be no config)
    this.subscription = this.modalService.getConfiguration()
      .pipe(first())
      .subscribe({
        next: (config: ModalConfiguration) => { // if there is no configuration config = {}
          if (config.isClosable === false) {
            this.isClosable = false;
            removeEventListener('click', this.handleDocumentClick);
          }
          if (config.title) {
            this.title = config.title;
            this.isTitle = true;
          }
        },
        complete: () => {
          console.log("modal component - getConfiguration complete")
        }
      })
  }

  setClickOutsideModalListener() {
    if (this.isClosable) {
      addEventListener('click', this.handleDocumentClick);
    }
  }

  close() {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    console.log("Remove event listener")
    removeEventListener('click', this.handleDocumentClick);
//    if (this.subscription) this.subscription.unsubscribe();
  }
}
