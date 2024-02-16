import {Component, OnInit} from '@angular/core';
import {Course, CourseDetails} from "../course";
import {Observable, Subscription, switchMap, take} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CoursesService} from "../courses.service";
import {ModalService} from "../../../core/services/modal.service";
import {ModalType} from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
// TODO: unsubscribe subscriptions!
export class CourseDetailComponent implements OnInit {
  course$! : Observable<Course>; // the exclamation mark acts as a non-null assertion operator
  courseDetails : CourseDetails | null | undefined = undefined;
  id: string = "-1";
  protected readonly Object = Object;
  //isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private modalService: ModalService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.coursesService.getCourseById(this.id);
    this.loadData();
  }
  loadData() {
    //this.isLoading = true;
    this.coursesService.getCourseDetailsById(this.id)
      .subscribe({
        next: (value: CourseDetails) => {
          this.courseDetails = Object.keys(value).length !== 0 ? value : null;
        }
      })
  }

  addDetails() {
    this.modalService.setConfiguration({title: "Add Course Details"});
    this.modalService.openModal(ModalType.CREATE_COURSE_DETAILS);
    this.modalService.getModalEvent()
      .pipe(take(1))
      .subscribe({
        next: (courseDetails: CourseDetails) => {
          courseDetails.id = this.id; //courseId;
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
  }
  updateDetails() {
    this.modalService.setConfiguration({title: "Update Course Details", data: this.courseDetails});
    this.modalService.openModal(ModalType.UPDATE_COURSE_DETAILS);
    this.modalService.getModalEvent()
      .pipe(take(1))
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
  }
  deleteDetails(id: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "details"});
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    this.modalService.getModalEvent()
      .pipe(take(1))
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
            this.modalService.closeModal();
          }
        }
      })
  }
}
