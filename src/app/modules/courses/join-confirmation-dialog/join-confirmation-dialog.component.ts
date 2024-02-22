import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-join-confirmation-dialog',
  templateUrl: './join-confirmation-dialog.component.html',
  styleUrls: ['./join-confirmation-dialog.component.scss']
})
export class JoinConfirmationDialogComponent implements OnInit, OnDestroy {
  courseName: string = "";
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
            this.courseName = config.data;
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
