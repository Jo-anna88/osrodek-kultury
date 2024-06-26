import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonAction, ModalConfiguration} from "../modal/modal";
import {first, Subscription} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit, OnDestroy {
  data: string = ""; // a kind of item/data to be deleted
  question: string = ""; // a custom question
  confirmButton = ButtonAction.DELETE;
  protected readonly buttonAction = ButtonAction;
  subscription: Subscription = new Subscription();
  constructor(private modalService: ModalService) {
  }
  ngOnInit() {
    this.subscription = this.modalService.getConfiguration()
      .pipe(first())
      .subscribe(
        {
          next: (config: ModalConfiguration) => {
            if (config.data) { this.data = config.data; }
            if (config.question) { this.question = config.question; }
            if (config.action) { this.confirmButton = config.action; }
            this.subscription.unsubscribe();
          }
        }
      );
  }

  cancel() {
    this.modalService.emitModalEvent(false);
  }

  confirm() {
    this.modalService.emitModalEvent(true);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
