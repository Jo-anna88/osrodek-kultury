import {Component} from '@angular/core';
import {first, Subscription} from "rxjs";
import {DashboardAction} from "../dashboard-actions-model";
import {ModalService} from "../../../core/services/modal.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {AlertService} from "../../alert/alert.service";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent {
  protected readonly DashboardAction = DashboardAction;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private alertService: AlertService) {
  }

  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new Child"});
    let subscription: Subscription = this.subscribeToAddChildModalEvent();
    this.modalService.openModal(ModalType.ADD_CHILD, subscription);
  }

  subscribeToAddChildModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {child: User}) => {
          this.createChildAccount(data.child);
          this.modalService.closeModal();
        }
      });
  }

  createChildAccount(child: User) {
    this.userService.addChild(child)
      .subscribe({
        next: (child: User) => {
          this.alertService.success(
            "Account for " + child.firstName + " " + child.lastName + " was created successfully.");
        }
      });
  }
}
