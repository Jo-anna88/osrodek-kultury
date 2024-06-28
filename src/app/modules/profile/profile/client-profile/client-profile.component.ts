import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course.model";
import {CulturalEvent} from "../../../cultural-events/cultural-event.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {UserService} from "../../../../core/services/user.service";
import {first, forkJoin, Subscription} from "rxjs";
import {ModalService} from "../../../../core/services/modal.service";
import {ButtonAction, ModalType} from "../../../../shared/components/modal/modal";
import {StorageService} from "../../../../core/services/storage.service";
import {AlertService} from "../../../alert/alert.service";
import {BookingService} from "../../../../core/services/booking.service";
import {Booking} from "../../../../shared/models/booking.model";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit, AfterViewChecked {
  @Input()
  user: User = {}

  courses: Course[] = [];
  bookings: Booking[] = [];
  children: User[] = [];

  coursesMenuItems: string[] = [];
  bookingsMenuItems: string[] = []; // change to bookings' number?
  childrenMenuItems: string[] = [];

  isLoading = false;
  spinnerNote = "Data are loading..."

  selectedChild: User = {};

  isAccountManager = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private viewportScroller: ViewportScroller,
              private userService: UserService,
              private bookingService: BookingService,
              private modalService: ModalService,
              private storageService: StorageService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.loadData();
  }

  // SCROLLING INTO FRAGMENT IF EXISTS //
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
      this.bookingService.getUserBookings(),
      this.userService.getChildren()
    ]).subscribe({
      next: ([courses, bookings, children]) => {
        this.courses = courses;
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })

        this.bookings = bookings;
        this.bookings.map((booking) => {
          this.bookingsMenuItems.push(booking.id!.toString());
        });

        this.children = children;
        this.children.map((child) => {
          this.childrenMenuItems.push(child.firstName + " " + child.lastName);
        });
      },
      error: (err) => { this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
    //todo: it could show details of selected class, like Schedule, Attendance and Payments (with redirection to e.g. ePay)
  }

  navigateToCulturalEvent(index: number) {
    let selectedEventId = this.bookings[index].culturalEventId;
    this.router.navigate(['events', selectedEventId]);
    //todo: it could show reservation details, like Date, Place/Venue, Number of Reserved Tickets
  }

  // WITHDRAW FROM COURSE //
  openModalDeleteCourse(index: number) {
    this.modalService.setConfiguration({
      title: "Withdraw from Class",
      question: "Do you really want to withdraw from " + this.courses[index].name + " class?",
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
          if(result) {this.withdrawFromClass(index);}
          this.modalService.closeModal();
        }
      });
  }

  withdrawFromClass(index: number) {
    let courseId = this.courses[index].id!;
    this.userService.removeCourse(courseId, this.user.id!).subscribe({
      next: () => {
        this.coursesMenuItems.splice(index, 1); // remove element from array
        this.alertService.success("You have withdrawn from class successfully.");
      }
    })
  }

  // BOOKING CANCELLATION //
  openModalDeleteEvent(index: number) {
    this.modalService.setConfiguration({
      title: "Booking Cancellation",
      question: "Do you really want to cancel your booking with number " + this.bookings[index].id + "?"});
    let subscription: Subscription = this.subscribeToBookingCancellationModalEvent(index);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToBookingCancellationModalEvent(index: number): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) { this.cancelBooking(index); }
          this.modalService.closeModal();
        }
      });
  }

  cancelBooking(index: number) { // it is not connected with backend now
    let culturalEventId = this.bookings[index].id!;
    console.log(culturalEventId);
    this.bookingService.cancelBooking(culturalEventId).subscribe({
      next: () => {
                this.bookingsMenuItems.splice(index, 1); // remove element from array
                this.alertService.success("You have cancelled your booking successfully.");
              }
    });
  }

  // DISPLAY SELECTED CHILD FRAGMENT //
  setSelectedChild(index: number) {
    this.selectedChild = this.children[index];
    this.router.navigate([], {relativeTo: this.route, fragment: 'selected-child-section' });
    setTimeout(() => { // hide selected child fragment after 60 sec.
      this.selectedChild = {}
      this.router.navigate([], {relativeTo: this.route})
    }, 60000);
  }

  // UPDATE CHILD //
  updateChild(updatedChild: User) {
    let index = this.children.findIndex(child => child.id === updatedChild.id); // find index in an array
    this.childrenMenuItems[index] = updatedChild.firstName + " " + updatedChild.lastName;
  }

  // DELETE CHILD //
  deleteChild() {
    this.selectedChild = {}
    this.router.navigate([], {relativeTo: this.route });
    let index = this.children.findIndex(child => child.id === this.selectedChild.id); // find index in an array
    this.childrenMenuItems.splice(index, 1); // remove element from array
  }

  // ACCOUNT MANAGER //
  toggleAccountManagerView() {
    this.isAccountManager = !this.isAccountManager;
    if (this.isAccountManager) {
      this.router.navigate([], {relativeTo: this.route, fragment: 'account-manager-section'});
    } else {
      this.router.navigate([], {relativeTo: this.route});
    }
  }

  // UPDATE ACCOUNT //
  onUpdateAccount() {
    this.modalService.setConfiguration({title: "Update profile data", data: {client: this.user}});
    let subscription = this.subscribeToUpdateAccountModalEvent();
    this.modalService.openModal(ModalType.UPDATE_CLIENT_ACCOUNT, subscription);
  }

  subscribeToUpdateAccountModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {client: User}) => {
          this.updateAccount(data.client);
          this.modalService.closeModal();
        }
      });
  }

  updateAccount(updatedClient: User) {
    this.userService.updateUserProfile(updatedClient).subscribe({
      next: (updatedUser: User) => {
        this.user = updatedUser;
        // update localstorage 'fullname' item
        this.storageService.save("fullname", updatedUser.firstName + " " + updatedUser.lastName);
        this.alertService.inform("If you have just changed your contact phone, remember to update contact phone for your children, if needed.")
      }
    });
  }


  // DELETE CCW ACCOUNT //
  onDeleteAccount() {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "account"});
    let subscription: Subscription = this.subscribeToDeleteAccount();
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteAccount(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteAccount();}
          this.modalService.closeModal();
        }
      });
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
