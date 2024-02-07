import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Category, Course, CourseDetails, DEFAULT_IMG_SOURCE} from "../course";
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";
import {ModalTestService} from "../../../shared/components/modal-test/modal-test.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ModalUserConfirmationComponent
} from "../../../shared/components/modal-user-confirmation/modal-user-confirmation.component";
import {ModalBtnAction} from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-classes',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  courses: Course[] = [];
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  modalTitle: string = "";
  modalAction: string = "";
  spinnerNote: string = "Classes are loading...";
  appError: AppError = {status: -1, statusTxt: "", description: ""};
  selectedCourse: Course = {name: "", teacher: "", description: "", category: Category.default}; // needed form create/update form
  selectedCourseDetails: CourseDetails = {}

  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              public dialog: MatDialog,
              protected modalTestService: ModalTestService,
              private router: Router) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.coursesService.getCourses()
      //.pipe(delay(5000))
      //.pipe(retry(3)) // to deal with slow connection
      .pipe(takeUntil(this.destroy$))
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

  toggleModal() {this.isModalOpen = !this.isModalOpen;}

  openModalCreate() {
    //this.modalTestService.open('modal-add'); // for test purposes
    this.modalTitle = "Create a new course"
    this.modalAction = ModalBtnAction.CREATE;
    this.toggleModal(); // to show modal form
  }
  openModalUpdate(course: Course) {
    this.selectedCourse = course;
    this.modalTitle = "Update " + course.name + " course"
    this.modalAction = ModalBtnAction.UPDATE;
    this.coursesService.getCourseDetailsById(course.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: CourseDetails) => {
          this.selectedCourseDetails = value;
        },
        complete: () => {
          this.toggleModal(); // to show modal form
        }
        }
      )
  }

  updateCourse({course, courseDetails}: {course: Course, courseDetails: CourseDetails | null}) { // when user click on 'submit' button in modal form
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
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedCourseDetails) => {console.log(updatedCourseDetails)},
          error: (err) => {
            if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
            this.alertService.error('An error occurred during updating the course details.');
          }
        })
    }


  }

  createCourse({course, courseDetails}: {course: Course, courseDetails: CourseDetails | null} ) { // when user click on 'submit' button in modal form
    course.imgSource = DEFAULT_IMG_SOURCE;
    this.coursesService.addCourse(course)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (newCourse: Course) => {
            this.courses.unshift(newCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
            if (courseDetails !== null) {
              courseDetails.id = newCourse.id;
              this.coursesService.addCourseDetails(courseDetails)
                .pipe(takeUntil(this.destroy$))
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
          },
          complete: () => {
            console.log("complete");
            this.toggleModal(); // to close the modal
          }
        }
      );
  }

  // delete confirmation dialog
  openConfirmationDialog(courseId: string): void {
    const dialogRef = this.dialog.open(ModalUserConfirmationComponent, {
      width: '250px',
      data: "course",
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => { if (result) { this.deleteCourse(courseId); } }
    });
  }

  deleteCourse(courseId: string){
    this.coursesService.deleteCourse(courseId)
      .pipe(takeUntil(this.destroy$))
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
