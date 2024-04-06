import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first, map, Observable, Subject, Subscription, takeUntil} from "rxjs";
import {DashboardAction} from "../dashboard-actions-model";
import {ModalService} from "../../../core/services/modal.service";
import {EmployeeProfile} from "../../../shared/components/card-team-member-profile/profile-model";
import {ModalType} from "../../../shared/components/modal/modal";
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent {
  protected readonly DashboardAction = DashboardAction;

  constructor(private modalService: ModalService, private userService: UserService) {}

  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new Child"});
    let subscription: Subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {child: User}) => {
          this.createChildAccount(data.child);
          //this.subscription.unsubscribe();
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.ADD_CHILD, subscription);
  }

  createChildAccount(child: User) {
    this.userService.addChild(child)
      .subscribe({
        next: (child: User) => {
          console.log("Account for " + child.firstName + " " + child.lastName + " was created successfully.");
        }
      });
  }

}
