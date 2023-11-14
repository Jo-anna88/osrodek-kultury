import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isClosable: boolean = true;
  @Input() modalTitle: string = "";
  isTitle: boolean = false;
  @Output()
  onModalClose = new EventEmitter();
  constructor (private renderer: Renderer2) {}

  ngOnInit() {
    if(this.isClosable) {
      addEventListener('click', (el: any) => {
        if (el.target!.localName === 'app-modal') {
          this.onModalClose.emit();
          //this.renderer.setStyle(el.target, 'display', 'none');
        }
      });
    }
    if(this.modalTitle) this.isTitle = true;
  }
  onClose() {
    this.onModalClose.emit();
    removeEventListener('click', () => {});
  }
}
