import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course.model";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../../core/services/modal.service";
import {first, Subscription} from "rxjs";
import {ButtonAction, ModalType} from "../../../../shared/components/modal/modal";
import {AlertService} from "../../../alert/alert.service";

@Component({
  selector: 'app-child-section',
  templateUrl: './child-section.component.html',
  styleUrls: ['./child-section.component.scss']
})
export class ChildSectionComponent implements OnInit {
  @Input()
  child: User = {}
  @Output()
  onChildUpdateEvent: EventEmitter<User> = new EventEmitter<User>();
  @Output()
  onChildDeleteEvent: EventEmitter<void> = new EventEmitter<void>();

  courses: Course[] = [];
  coursesMenuItems: string[] = [];

  constructor(private userService: UserService,
              private modalService: ModalService,
              private router: Router,
              private alertService: AlertService) {}

  ngOnInit() {
    this.userService.getCoursesByUserId(this.child.id!).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })
      }
    })
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
  }

  onChildUpdate() {
    this.openModalUpdate(this.child);
  }

  onChildDelete() {
    this.openModalDelete(this.child.id!);
  }

  // UPDATE CHILD //
  openModalUpdate(child: User) {
    this.modalService.setConfiguration({
      title: "Update child: " + child.firstName + " " + child.lastName,
      data: {client: child}
    });
    let subscription: Subscription = this.subscribeToUpdateChildModalEvent();
    this.modalService.openModal(ModalType.UPDATE_CLIENT_ACCOUNT, subscription);
  }

  subscribeToUpdateChildModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: { client: User }) => {
          this.updateChild(data.client);
          this.modalService.closeModal();
        }
      });
  }

  updateChild(child: User) {
    this.userService.updateChild(child)
      .subscribe({
        next: (updatedChild: User) => {
          this.child = updatedChild; // to update data in child-section.html
          this.onChildUpdateEvent.emit(updatedChild);
        }
      });
  }

  // DELETE CHILD //
  openModalDelete(childId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "child"});
    let subscription: Subscription = this.subscribeToDeleteChildModalEvent(childId);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteChildModalEvent(childId: string): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if (result) { this.deleteChild(childId); }
          this.modalService.closeModal();
        }
      });
  }

  deleteChild(childId: string) {
    this.userService.deleteChild(childId)
      .subscribe({
        next: () => {
          this.onChildDeleteEvent.emit();
        }
      });
  }

  // WITHDRAW FROM CLASS //
  openModalDeleteCourse(index: number) {
    this.modalService.setConfiguration({
      title: "Withdraw from Class",
      question: "Do you really want to withdraw " + this.child.firstName + " " + this.child.lastName
        + " from " + this.courses[index].name + " class?",
      action: ButtonAction.WITHDRAW
    });
    let subscription: Subscription = this.subscribeToWithdrawFromCourseModalEvent(index);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToWithdrawFromCourseModalEvent(index: number): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if (result) { this.withdrawFromClass(index); }
          this.modalService.closeModal();
        }
      });
  }

  withdrawFromClass(index: number) {
    let courseId = this.courses[index].id!;
    this.userService.removeCourse(courseId, this.child.id!).subscribe({
      next: () => {
        this.coursesMenuItems.splice(index, 1); // remove element from array
        this.alertService.success("You have withdrawn from class successfully.");
      }
    })
  }
}
