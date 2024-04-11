import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../../core/services/modal.service";
import {first, Subscription} from "rxjs";
import {ModalType} from "../../../../shared/components/modal/modal";

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
              private router: Router) {}

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

  openModalUpdate(child: User) {
            this.modalService.setConfiguration({title: "Update child: " + child.firstName + " " + child.lastName,
              data: {child: child}})
            //this.modalService.openModal(ModalType.UPDATE_COURSE);
            let subscription: Subscription = this.modalService.getModalEvent()
              .pipe(first())
              .subscribe({
                next: (data: {child: User}) => {
                  this.updateChild(data.child);
                  this.modalService.closeModal();
                }
              })
            this.modalService.openModal(ModalType.UPDATE_CHILD, subscription);
          }

updateChild(child: User) {
    this.userService.updateChild(child)
      .subscribe({
        next: (updatedChild) => {
          this.child = updatedChild; // to update data in child-section.html
          this.onChildUpdateEvent.emit(updatedChild);
        }
      })
}

  openModalDelete(childId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "child"});
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteChild(childId);}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  deleteChild(childId: string) {
    this.userService.deleteChild(childId)
      .subscribe({
        next: (value) => {
          this.onChildDeleteEvent.emit();
        }
      })
  }

}
