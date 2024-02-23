import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Subject, Subscription, take, takeUntil} from "rxjs";
import {Category, Course, CourseDetails, DEFAULT_IMG_SOURCE} from "../course";
import {CoursesService} from "../courses.service";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";
import {ModalType} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {Role} from "../../../shared/models/user.model";

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
  selectedCourse: Course = {name: "", teacher: "", description: "", category: Category.default}; // needed form create/update form
  selectedCourseDetails: CourseDetails = {}
  isAuthorized: boolean = false;

  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              private modalService: ModalService,
              private authService: AuthService) {}
  ngOnInit(): void {
    this.loadData();
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
          if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          this.alertService.error('An error occurred during loading the courses.');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

// it opens modal with form to create new course with courseDetails as optional
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new course"});
    this.modalService.openModal(ModalType.CREATE_COURSE);
    this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
          this.createCourse(data.course, data.courseDetails);
          //this.subscription.unsubscribe();
          this.modalService.closeModal();
        }
      });
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
            this.modalService.openModal(ModalType.UPDATE_COURSE);
            this.modalService.getModalEvent()
              .pipe(first())
              .subscribe({
                next: (data: {course: Course, courseDetails: CourseDetails | null}) => {
                  this.updateCourse(data.course, data.courseDetails);
                  this.modalService.closeModal();
                }
              })
          }
        }
      )
  }

  // open delete confirmation dialog
  openModalDelete(courseId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "course"});
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteCourse(courseId);}
          this.modalService.closeModal();
        }
      });
  }

  createCourse(course: Course, courseDetails: CourseDetails | null) { // when user click on 'submit' button in modal form
    // here isModalOpen is false when only course is created and true if a course with courseDetails are created(why?)
    course.imgSource = DEFAULT_IMG_SOURCE;
    this.coursesService.addCourse(course)
      //.pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (newCourse: Course) => {
            this.courses.unshift(newCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
            if (courseDetails !== null) {
              courseDetails.id = newCourse.id;
              this.coursesService.addCourseDetails(courseDetails)
                //.pipe(takeUntil(this.destroy$))
                .subscribe({
                  error: (err) => {
                    if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
                    this.alertService.error('An error occurred during adding the course details.')
                  }
                })
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
