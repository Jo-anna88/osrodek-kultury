import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {first, forkJoin, Subscription} from "rxjs";
import {UserSimpleData} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-join-confirmation-dialog',
  templateUrl: './join-confirmation-dialog.component.html',
  styleUrls: ['./join-confirmation-dialog.component.scss']
})
export class JoinConfirmationDialogComponent implements OnInit, OnDestroy {
  courseName: string = "";
  protected readonly buttonAction = ButtonAction;
  subscription: Subscription = new Subscription();
  persons: UserSimpleData[] = [];
  isLoading = false;
  constructor(private modalService: ModalService, private userService: UserService) {
  }
  ngOnInit() {
    this.isLoading = true;

    // load persons
    forkJoin([
      this.modalService.getConfiguration().pipe(first()),
      this.userService.getUserSimpleData(),
      this.userService.getChildrenSimpleData()
    ]).subscribe({
      next: ([config, user, children]) => {
        this.courseName = config.data;
        this.persons.push(user);
        children.forEach(child => this.persons.push(child));
      },
      error: () => {this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    });
  }

  cancel() {
    this.modalService.emitModalEvent({isConfirmed: false, id: ''});
  }
  confirm() {
    this.modalService.emitModalEvent({isConfirmed: true, id: this.persons[0].id});
  }

  onSubmit(participantForm: NgForm) {
    //this.modalService.emitModalEvent(participantForm.value)
    let value: {person: UserSimpleData} = participantForm.value;
    let id = value.person.id!;
    this.modalService.emitModalEvent({isConfirmed: true, id: id});
    participantForm.resetForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
