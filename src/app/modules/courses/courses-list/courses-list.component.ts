import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Subject, Subscription, take, takeUntil} from "rxjs";
import {Category, Course, CourseDetails} from "../course";
import {CoursesService} from "../courses.service";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";
import {ModalType} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {Role} from "../../../shared/models/user.model";
import {SearchType} from "../../../shared/models/search-type.model";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../../../core/services/search.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  courses: Course[] = [];
  isLoading: boolean = false;
  spinnerNote: string = "Classes are loading...";
  appError: AppError = {status: -1, statusTxt: "", description: ""};
  selectedCourse: Course = {name: "", teacher: {}, description: "", category: Category.default};
  selectedCourseDetails: CourseDetails = {}
  isAuthorized: boolean = false;
  protected readonly SearchType = SearchType;
  isError: boolean = false;

  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              private modalService: ModalService,
              private authService: AuthService,
              private searchService: SearchService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(parameters => { // in case of e.g. browser refresh or history
      if (Object.keys(parameters).length) {
        this.isLoading = true;
        this.searchService.searchCoursesByParams(parameters).subscribe({
          next: (result) => {this.courses = result},
          error: (err) => {this.isLoading = false; this.isError = true;},
          complete: () => {this.isLoading = false;}
        })
      }
      else { this.loadData(); }
    });
    this.setIsAuthorized();
  }

  setIsAuthorized() {
    //this.authService.initAuthStatus(); // for browser refresh
    this.authService.role$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (value) => {
        this.isAuthorized = (value !== null && value !== Role.Client);
      }
    })
  }

  loadData() {
    this.isLoading = true;
    this.coursesService.getCourses()
      //.pipe(delay(5000))
      //.pipe(retry(3)) // to deal with slow connection
      //.pipe(takeUntil(this.destroy$))
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: Course[]) => {
          this.courses = value;
        },
        error: (err) => {
          this.isError = true;
          //if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          //this.alertService.error('An error occurred during loading the courses.');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  clearResults() {
    this.loadData();
  }

// it opens modal with form to create new course with courseDetails as optional
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new course"});
    // this.modalService.openModal(ModalType.CREATE_COURSE);
    let subscription: Subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
          this.createCourse(data.course, data.courseDetails);
          //this.subscription.unsubscribe();
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.CREATE_COURSE, subscription);
  }
  // it opens modal with form to update a course with courseDetails as optional
  openModalUpdate(course: Course) {
    this.selectedCourse = course;
    this.coursesService.getCourseDetailsById(course.id!) // get selected course details
      .subscribe({
          next: (value: CourseDetails) => { // value === {} if courseDetails does not exist
            this.selectedCourseDetails = value;
            this.modalService.setConfiguration({title: "Update " + course.name + " course",
              data: {course: course, courseDetails: value}})
            //this.modalService.openModal(ModalType.UPDATE_COURSE);
            let subscription: Subscription = this.modalService.getModalEvent()
              .pipe(first())
              .subscribe({
                next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
                  this.updateCourse(data.course, data.courseDetails);
                  this.modalService.closeModal();
                }
              })
            this.modalService.openModal(ModalType.UPDATE_COURSE, subscription);
          }
        }
      )
  }

  // open delete confirmation dialog
  openModalDelete(courseId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "course"});
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteCourse(courseId);}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  createCourse(course: Course, courseDetails: CourseDetails | null) { // when user click on 'submit' button in modal form
    // here isModalOpen is false when only course is created and true if a course with courseDetails are created(why?)
    this.coursesService.addCourse(course)
      //.pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (newCourse: Course) => {
            if (courseDetails !== null) {
              courseDetails.id = newCourse.id;
              this.coursesService.addCourseDetails(courseDetails)
                //.pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: () => this.courses.unshift(newCourse), // add course with details to the list (in case of error with details - don't add the course at all)
                  error: (err) => {
                    if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
                    this.alertService.error('An error occurred during adding the course details.')
                  }
                })
            } else { // add course without the details to the list
              this.courses.unshift(newCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
            }
          },
          error: (err) => {
            if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
            this.alertService.error('An error occurred during creating the course.');
          }
        }
      );
  }

  updateCourse(course: Course, courseDetails: CourseDetails | null) { // when user click on 'submit' button in modal form
    // here isModalOpen is false when only course is updated and true if a course with courseDetails are updated(why?)
    course.id = this.selectedCourse.id;
    this.coursesService.updateCourse(course)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (updatedCourse) => {
            let index = this.courses.findIndex(c => c.id === updatedCourse.id); // find index in an array
            this.courses[index] = updatedCourse;
          },
          error: (err) => {
            if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
            this.alertService.error('An error occurred during updating the course.');
          }
        }
      );
    if (courseDetails !== null) {
      courseDetails.id = course.id;
      this.coursesService.updateCourseDetails(courseDetails)
        //.pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedCourseDetails) => {console.log("updated course details: ", updatedCourseDetails)},
          error: (err) => {
            if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
            this.alertService.error('An error occurred during updating the course details.');
          }
        })
    }
  }

  deleteCourse(courseId: string){
    this.coursesService.deleteCourse(courseId)
      //.pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (id) => {
            let index = this.courses.findIndex(c => c.id === id); // find index in an array
            this.courses.splice(index, 1); // remove element from array
            this.alertService.success("The course was deleted.");
          },
          error: (err) => {
            if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
            this.alertService.error("An error occurred during deleting the course.", this.appError);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
