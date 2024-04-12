import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {CulturalEvent} from "../../../cultural-events/cultural-events/cultural-event";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {UserService} from "../../../../core/services/user.service";
import {first, forkJoin} from "rxjs";
import {ModalService} from "../../../../core/services/modal.service";
import {ButtonAction, ModalType} from "../../../../shared/components/modal/modal";
import {StorageService} from "../../../../core/services/storage.service";

// enum TypeOfItem {
//   COURSE = 'Course',
//   EVENT = 'Event',
//   CHILD = 'Child'
// }

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit, AfterViewChecked {
  @Input()
  user: User = {}

  courses: Course[] = [];
  culturalEvents: CulturalEvent[] = [];
  children: User[] = [];

  coursesMenuItems: string[] = [];
  culturalEventsMenuItems: string[] = [];
  childrenMenuItems: string[] = [];

  isLoading = false;
  spinnerNote = "Data are loading..."

  //isSelected = false;
  //typeOfSelectedItem: TypeOfItem | undefined = undefined;
  selectedChild: User = {};

  isAccountManager = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private viewportScroller: ViewportScroller,
              private userService: UserService,
              private modalService: ModalService,
              private storageService: StorageService) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewChecked(): void {
    this.route.fragment
      .subscribe((fragment) => {
        if (fragment) {
          //this.viewportScroller.scrollToAnchor(fragment);
          const targetElement = document.getElementById(fragment)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
          } else {
          //this.viewportScroller.scrollToPosition([0,0]);
            window.scrollTo(0, 0);
          }
        }
      });
  }

  loadData() {
    this.isLoading = true;

    forkJoin([
      this.userService.getUserCourses(),
      this.userService.getUserEvents(),
      this.userService.getChildren()
    ]).subscribe({
      next: ([courses, culturalEvents, children]) => {
        this.courses = courses;
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })

        this.culturalEvents = culturalEvents;
        this.culturalEvents.map((culturalEvent) => {
          this.culturalEventsMenuItems.push(culturalEvent.name);
        });

        this.children = children;
        this.children.map((child) => {
          this.childrenMenuItems.push(child.firstName + " " + child.lastName);
        });
      },
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    })
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
    //todo: it could show details of selected class, like Schedule, Attendance and Payments (with redirection to e.g. ePay)
  }

  navigateToCulturalEvent(index: number) {
    //this.isSelected = true;
    //this.typeOfSelectedItem = TypeOfItem.EVENT;
    //this.selectedItem = this.culturalEvents[index];
    let selectedEventId = this.culturalEvents[index].id;
    this.router.navigate(['events', selectedEventId]);
    //todo: it could show reservation details, like Date, Place/Venue, Number of Reserved Tickets
  }

  openModalDeleteCourse(index: number) {
    this.modalService.setConfiguration({
      title: "Withdraw from Class",
      question: "Do you really want to withdraw from " + this.courses[index].name + " class?",
      action: ButtonAction.WITHDRAW
    });
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.withdrawFromClass(index);}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  withdrawFromClass(index: number) {
    let courseId = this.courses[index].id!;
    this.userService.removeCourse(courseId, this.user.id!).subscribe({
      error: (err) => {console.log(err)},
      complete: () => {
        this.coursesMenuItems.splice(index, 1); // remove element from array
        console.log("Course was removed successfully.")
      }
    })
  }

  openModalDeleteEvent(index: number) {
    this.modalService.setConfiguration({
      title: "Booking Cancellation",
      question: "Do you really want to cancel your booking for " + this.culturalEvents[index].name + " event?"});
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.cancelBooking(index);}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  cancelBooking(index: number) {
    let culturalEventId = this.culturalEvents[index].id!;
    console.log(culturalEventId);
    //this.userService.removeBooking(culturalEventId, '')
  }

  setSelectedChild(index: number) {
    this.selectedChild = this.children[index];
    this.router.navigate([], {relativeTo: this.route, fragment: 'selected-child-section' });
    setTimeout(() => {
      this.selectedChild = {}
      this.router.navigate([], {relativeTo: this.route})
    }, 60000); // 60s
  }

  updateChild(updatedChild: User) {
    let index = this.children.findIndex(child => child.id === updatedChild.id); // find index in an array
    this.childrenMenuItems[index] = updatedChild.firstName + " " + updatedChild.lastName;
  }

  deleteChild() {
    this.selectedChild = {}
    this.router.navigate([], {relativeTo: this.route });
    let index = this.children.findIndex(child => child.id === this.selectedChild.id); // find index in an array
    this.childrenMenuItems.splice(index, 1); // remove element from array
  }

  toggleAccountManagerView() {
    this.isAccountManager = !this.isAccountManager;
    if (this.isAccountManager) {
      this.router.navigate([], {relativeTo: this.route, fragment: 'account-manager-section'});
    } else {
      this.router.navigate([], {relativeTo: this.route});
    }
  }

  onUpdateAccount() {
    this.modalService.setConfiguration({title: "Update profile data", data: {client: this.user}});
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {client: User}) => {
          this.updateAccount(data.client);
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.UPDATE_CLIENT_ACCOUNT, subscription);
  }

  updateAccount(updatedClient: User) {
    this.userService.updateUserProfile(updatedClient).subscribe({
      next: (updatedUser: User) => {
        this.user = updatedUser;
        // update localstorage 'fullname' item
        this.storageService.save("fullname", updatedUser.firstName + " " + updatedUser.lastName);
        console.log("If you has just changed your contact phone, remember to update contact phone for your children, if needed.")
      }
    });
  }

  onDeleteAccount() {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "account"});
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteAccount();}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  deleteAccount() {
    this.userService.removeAccount().subscribe({
      error: (err) => {console.log(err)},
      complete: () => {
        this.storageService.clear();
        this.router.navigate(["/"])
      }
    })
  }
}
