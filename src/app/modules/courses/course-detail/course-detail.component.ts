import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Course, CourseDetails} from "../course";
import {first, Observable, Subject, Subscription, switchMap, take, takeUntil} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CoursesService} from "../courses.service";
import {ModalService} from "../../../core/services/modal.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {Role} from "../../../shared/models/user.model";
import {AuthService} from "../../../core/authorization/auth.service";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
// TODO: unsubscribe subscriptions!
export class CourseDetailComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  course$! : Observable<Course>; // the exclamation mark acts as a non-null assertion operator
  courseDetails : CourseDetails | null | undefined = undefined;
  courseDetailsId: string = "-1";
  protected readonly Object = Object;
  isAuthorized: boolean = false;
  isClient: boolean = false;
  //isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private modalService: ModalService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.courseDetailsId = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.coursesService.getCourseById(this.courseDetailsId);
    this.loadData();
    this.setIsAuthorized();
    if(this.modalService.isModalOpen) this.modalService.closeModal(); // because of redirection from update course form
  }

  setIsAuthorized() {
    //this.authService.initAuthStatus(); // for browser refresh
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
    //this.isLoading = true;
    this.coursesService.getCourseDetailsById(this.courseDetailsId)
      .subscribe({
        next: (value: CourseDetails) => {
          this.courseDetails = value.id !== null ? value : null;
        }
      })
  }

  addDetails() {
    this.modalService.setConfiguration({title: "Add Course Details"});
    //this.modalService.openModal(ModalType.CREATE_COURSE_DETAILS);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (courseDetails: CourseDetails) => {
          courseDetails.id = this.courseDetailsId; //courseId;
          console.log("Course Details to add: ", courseDetails);
          this.coursesService.addCourseDetails(courseDetails)
            //.pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (newCourseDetails) => {
                console.log("Response: ", newCourseDetails);
                this.courseDetails = newCourseDetails;
              }
            });
          //this.subscription.unsubscribe(); // it is not needed because of first() ?? or maybe there should be take(1)?
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.CREATE_COURSE_DETAILS, subscription);
  }
  updateDetails() {
    this.modalService.setConfiguration({title: "Update Course Details", data: this.courseDetails});
    //this.modalService.openModal(ModalType.UPDATE_COURSE_DETAILS);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (courseDetails: CourseDetails) => {
          console.log("Course Details to update: ", courseDetails);
          this.coursesService.updateCourseDetails(courseDetails)
            //.pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (updatedCourseDetails) => {
                console.log("Response after signup: ", updatedCourseDetails);
                this.courseDetails = updatedCourseDetails;
              }
            });
          this.modalService.closeModal();
        }
      })
    this.modalService.openModal(ModalType.UPDATE_COURSE_DETAILS, subscription);
  }
  deleteDetails(id: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "details"});
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (isConfirmed: boolean) => {
          if (isConfirmed) {
            this.coursesService.deleteCourseDetails(id)
              //.pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  console.log("Deleted successfully");
                  this.courseDetails = null;
                }
              });
          }
        },
        complete: () => {this.modalService.closeModal();}
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  openJoinDialog(courseName: string) {
    this.modalService.setConfiguration({title: "Confirm your choice", data: courseName});
    //this.modalService.openModal(ModalType.JOIN_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (value: {isConfirmed: boolean, id: string}) => {
          if (value.isConfirmed) {
           this.userService.joinCourse(this.courseDetailsId, value.id).subscribe({
             next: (value) => {
               console.log(value); // null
               this.course$ = this.coursesService.getCourseById(this.courseDetailsId); // for freeSlots refresh
             },
             error: (err) => {console.log(err)},
             complete: () => {console.log("join course - completed")}
           });
          }
        },
        complete: () => {this.modalService.closeModal();}
      });
    this.modalService.openModal(ModalType.JOIN_CONFIRMATION, subscription);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
