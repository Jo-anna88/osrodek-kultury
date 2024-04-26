import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Course, CourseDetails} from "../course";
import {first, Observable, Subject, Subscription, switchMap, take, takeUntil} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CoursesService} from "../courses.service";
import {ModalService} from "../../../core/services/modal.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {Role, User} from "../../../shared/models/user.model";
import {AuthService} from "../../../core/authorization/auth.service";
import {UserService} from "../../../core/services/user.service";
import {AlertService} from "../../alert/alert.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})

export class CourseDetailComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  course$! : Observable<Course>; // an exclamation mark acts as a non-null assertion operator
  courseDetails : CourseDetails | null | undefined = undefined;
  courseDetailsId: string = "-1";
  protected readonly Object = Object;
  isAuthorized: boolean = false;
  isClient: boolean = false;
  // isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private modalService: ModalService,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.courseDetailsId = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.coursesService.getCourseById(this.courseDetailsId);
    this.loadData();
    this.setIsAuthorized();
    if(this.modalService.isModalOpen) { this.modalService.closeModal(); } // because of redirection from update course form
  }

  setIsAuthorized() {
    // this.authService.initAuthStatus(); // for browser refresh
    this.authService.role$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.isAuthorized = (value !== null && value !== Role.Client);
          this.isClient = (value !== null && value === Role.Client);
        }
      })
  }

  loadData() {
    // this.isLoading = true;
    this.coursesService.getCourseDetailsById(this.courseDetailsId)
      .subscribe({
        next: (value: CourseDetails) => { // value === {} if courseDetails does not exist
          this.courseDetails = !!value.id ? value : null;
        },
        // error: (err) => { this.isLoading = false; },
        // complete: () => { this.isLoading = false; }
      })
  }

  // CREATE DETAILS //
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add Course Details"});
    let subscription: Subscription = this.subscribeToAddDetailsModalEvent();
    this.modalService.openModal(ModalType.CREATE_COURSE_DETAILS, subscription);
  }

  subscribeToAddDetailsModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (courseDetails: CourseDetails) => {
          courseDetails.id = this.courseDetailsId; // courseDetailsId is the same as courseId;
          this.addDetails(courseDetails);
          this.modalService.closeModal();
        }
      });
  }

  addDetails(courseDetails: CourseDetails) {
    this.coursesService.addCourseDetails(courseDetails)
      .subscribe({
        next: (newCourseDetails) => { this.courseDetails = newCourseDetails; }
      });
  }

  // UPDATE DETAILS //
  openModalUpdate() {
    this.modalService.setConfiguration({title: "Update Course Details", data: this.courseDetails});
    let subscription = this.subscribeToUpdateDetailsModalEvent();
    this.modalService.openModal(ModalType.UPDATE_COURSE_DETAILS, subscription);
  }

  subscribeToUpdateDetailsModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (courseDetails: CourseDetails) => {
          courseDetails.id = this.courseDetailsId;
          this.updateDetails(courseDetails);
          this.modalService.closeModal();
        }
      });
  }

  updateDetails(courseDetails: CourseDetails) {
    this.coursesService.updateCourseDetails(courseDetails)
      //.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedCourseDetails) => { this.courseDetails = updatedCourseDetails; }
      });
  }

  // DELETE DETAILS //
  openModalDelete(courseDetailsId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "details"});
    let subscription: Subscription = this.subscribeToDeleteDetailsModalEvent(courseDetailsId);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteDetailsModalEvent(courseDetailsId: string): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (isConfirmed: boolean) => {
          if (isConfirmed) { this.deleteDetails(courseDetailsId); }
          this.modalService.closeModal();
        }
      });
  }

  deleteDetails(id: string) {
    this.coursesService.deleteCourseDetails(id)
      .subscribe({
        next: () => { this.courseDetails = null; }
      });
  }

  // JOIN COURSE //
  openJoinDialog(courseName: string) {
    this.modalService.setConfiguration({title: "Confirm your choice", data: courseName});
    let subscription = this.subscribeToJoinCourseModalEvent();
    this.modalService.openModal(ModalType.JOIN_CONFIRMATION, subscription);
  }

  subscribeToJoinCourseModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (value: { isConfirmed: boolean, id: string }) => {
          if (value.isConfirmed) { this.joinCourse(this.courseDetailsId, value.id); }
          this.modalService.closeModal();
        }
      });
  }

  joinCourse(courseId: string, userId: string) {
    this.userService.joinCourse(courseId, userId).subscribe({
      next: (value) => {
        this.course$ = this.coursesService.getCourseById(this.courseDetailsId); // for freeSlots refresh
        this.alertService.success("Your join request has been sent and accepted!");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
