import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Subject, Subscription, take, takeUntil} from "rxjs";
import {Category, Course, CourseDetails} from "../course.model";
import {CoursesService} from "../courses.service";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";
import {ModalType} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {Role} from "../../../shared/models/user.model";
import {SearchType} from "../../../shared/models/search-type.model";
import {ActivatedRoute, Params} from "@angular/router";
import {SearchService} from "../../../core/services/search.service";
import {NO_DATA_AVAILABLE, NO_SEARCH_RESULT} from "../../../../assets/constants";

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
  isError: boolean = false;
  protected readonly SearchType = SearchType;
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;
  protected readonly NO_SEARCH_RESULT = NO_SEARCH_RESULT;

  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              private modalService: ModalService,
              private authService: AuthService,
              private searchService: SearchService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((parameters: Params) => { // in case of e.g. browser refresh or history
        if (Object.keys(parameters).length) {
          this.isLoading = true;
          this.subscribeToSearchCoursesByParams(parameters);
        } else { this.loadData(); }
      });
    this.setIsAuthorized();
  }

  subscribeToSearchCoursesByParams(parameters: Params) {
    this.searchService.searchCoursesByParams(parameters).subscribe({
      next: (result) => { this.courses = result },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
      },
      complete: () => { this.isLoading = false; }
    });
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
      //.pipe(delay(5000)) // to test delay with server response
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: Course[]) => { this.courses = value; },
        error: (err) => {
          this.isError = true;
          this.isLoading = false;
        },
        complete: () => { this.isLoading = false; }
      })
  }

  clearResults() {
    this.loadData();
  }

  // CREATE COURSE //
  // it opens modal with form to create new course with courseDetails as optional
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new course"});
    let subscription: Subscription = this.subscribeToAddCourseModalEvent();
    this.modalService.openModal(ModalType.CREATE_COURSE, subscription);
  }

  subscribeToAddCourseModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
          this.createCourse(data.course, data.courseDetails);
          this.modalService.closeModal();
        }
      });
  }

  createCourse(course: Course, courseDetails: CourseDetails | null) { // when user click on 'submit' button in modal form
    // here isModalOpen is false when only course is created and true if a course with courseDetails are created(why?)
    this.coursesService.addCourse(course)
      .subscribe({
          next: (newCourse: Course) => {
            if (courseDetails !== null) {
              courseDetails.id = newCourse.id;
              this.coursesService.addCourseDetails(courseDetails)
                //.pipe(takeUntil(this.destroy$))
                .subscribe(() => this.courses.unshift(newCourse)) // add course with details to the list (in case of error with details - don't add the course at all)
            } else { // add course without details to the list
              this.courses.unshift(newCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
            }
          }
          // error: (err) => {
          //   if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          //   this.alertService.error('An error occurred during creating the course.');
          // }
        }
      );
  }

  // UPDATE COURSE //
  // it opens modal with form to update a course with courseDetails as optional
  openModalUpdate(course: Course) {
    this.selectedCourse = course;
    this.fetchCourseDetails();
  }

  fetchCourseDetails() {
    this.coursesService.getCourseDetailsById(this.selectedCourse.id!) // get selected course details
      .subscribe({
          next: (value: CourseDetails) => { // value === {} if courseDetails does not exist
            this.selectedCourseDetails = value;
            this.configureUpdateCourseModal();
          }
        }
      )
  }

  configureUpdateCourseModal() {
    this.modalService.setConfiguration({title: "Update " + this.selectedCourse.name + " course",
      data: {course: this.selectedCourse, courseDetails: this.selectedCourseDetails}})
    let subscription: Subscription = this.subscribeToUpdateCourseModalEvent();
    this.modalService.openModal(ModalType.UPDATE_COURSE, subscription);
  }

  subscribeToUpdateCourseModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
          this.updateCourse(data.course, data.courseDetails);
          this.modalService.closeModal();
        }
      })
  }

  updateCourse(course: Course, courseDetails: CourseDetails | null) { // when user click on 'submit' button in modal form
    // here isModalOpen is false when only course is updated and true if a course with courseDetails are updated(why?)
    course.id = this.selectedCourse.id;
    this.coursesService.updateCourse(course)
      .subscribe({
          next: (updatedCourse) => {
            let index = this.courses.findIndex(c => c.id === updatedCourse.id); // find index in an array
            this.courses[index] = updatedCourse;
          },
          // error: (err) => {
          //   if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          //   this.alertService.error('An error occurred during updating the course.');
          // }
        }
      );
    if (courseDetails !== null) { this.updateCourseDetails(courseDetails, course.id!); }
  }

  updateCourseDetails(courseDetails: CourseDetails, courseId: string) {
    courseDetails.id = courseId;
    this.coursesService.updateCourseDetails(courseDetails)
      .subscribe(
        // {
        // next: (updatedCourseDetails) => {},
        // error: (err) => {
        //   if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
        //   this.alertService.error('An error occurred during updating the course details.');
        // }}
      )
  }

  // DELETE COURSE //
  // open delete confirmation dialog
  openModalDelete(courseId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "course"});
    let subscription = this.subscribeToDeleteCourseModalEvent(courseId);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteCourseModalEvent(courseId: string): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteCourse(courseId);}
          this.modalService.closeModal();
        }
      });
  }

  deleteCourse(courseId: string){
    this.coursesService.deleteCourse(courseId)
      .subscribe(
        {
          next: (id) => {
            let index = this.courses.findIndex(c => c.id === id); // find index in an array
            this.courses.splice(index, 1); // remove element from array
            this.alertService.success("The course was deleted successfully.");
          },
          // error: (err) => {
          //   if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          //   this.alertService.error("An error occurred during deleting the course.", this.appError);
          // }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
