import {Component, OnInit} from '@angular/core';
import {Course, CourseDetails} from "../course";
import {Observable, Subscription, switchMap} from "rxjs";
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
  //isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private modalService: ModalService
  ) {}
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    //this.isLoading = true;
    this.course$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          //this.coursesService.getCourseById(+params.get('id')!)) // converting a string to a number by using the ‘+’ unary operator.
          //(if params.get('id'))
          this.coursesService.getCourseById(params.get('id')!)
      )
    );

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.coursesService.getCourseDetailsById(params.get('id')!)
      )
    ).subscribe({
        next: (value: CourseDetails) => {
          this.courseDetails = Object.keys(value).length !== 0 ? value : null;
        }
      }
    );
  }

  protected readonly Object = Object;

  addDetails() {
    this.modalService.setConfiguration({title: "Add Course Details"});
    // this.router.navigate([{outlets: {modalOutlet: ['modal', 'delete']}}]);
    // this.modalService.getEvent().subscribe({
    //     next: ({user: newUser, password: pswd}) => {
    //       this.authService.signUp(newUser, pswd)
    //         .subscribe({
    //           next: (nUser) => {
    //             console.log("Response after signup: ", nUser);
    //           }
    //         })
    //       this.modalService.close();
    //     }
    //   })
    // )
  }
  updateDetails(courseDetails: CourseDetails) {
    this.modalService.setConfiguration({title: "Update Course Details", data: courseDetails});
    this.modalService.openModal(ModalType.UPDATE_COURSE_DETAILS);
    this.modalService.getEvent().subscribe({
      next: (courseDetails: CourseDetails) => {
        console.log(courseDetails);
        this.coursesService.updateCourseDetails(courseDetails)
          .subscribe({
            next: (updatedCourseDetails) => {
              console.log("Response after signup: ", updatedCourseDetails);
            }
          });
        this.modalService.closeModal();
        this.loadData();
      }
    })
  }
  deleteDetails(id: string) {
    this.modalService.setConfiguration({title:"Delete Confirmation", data: "details"});
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    this.modalService.getEvent().subscribe({
      next: (isConfirmed: boolean) => {
        if(isConfirmed) {
          this.coursesService.deleteCourseDetails(id)
            .subscribe({
              next: () => {console.log("Deleted successfully")}
            });
          this.modalService.closeModal();
          this.loadData();
        }
      }
    })
  }
}
