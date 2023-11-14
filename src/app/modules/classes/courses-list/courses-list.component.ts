import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {DEFAULT_IMG_SOURCE, Course} from "../course";
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
  destroy$: Subject<any> = new Subject();
  courses: Course[] = [];
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  modalTitle: string = "";
  modalAction: string = "";
  spinnerNote: string = "Classes are loading...";
  appError: AppError = {status: -1, statusTxt: "", description: ""};
  selectedCourse: Course = {name: "", teacher: "", description: ""}; // needed form create/update form

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
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: Course[]) => {
          this.courses = value;
        },
        error: (err) => {
          if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          this.alertService.error('An error occurred during loading the classes.');
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
    this.toggleModal(); // to show modal form
  }

  updateCourse(updatedCourse:Course) { // when user click on 'submit' button in modal form
    console.log("*************update******************")
    updatedCourse.id = this.selectedCourse.id;
    this.coursesService.updateCourse(updatedCourse)
      .subscribe({
        next: (uCourse) => {
            let index = this.courses.findIndex(c => c.id === uCourse.id); // find index in an array
            this.courses[index] = uCourse;
          },
        error: (err) => {
          if (err.status || err.status === 0) this.appError = errorStatusToAppErrorMapping.get(err.status)!;
          this.alertService.error('An error occurred during updating the course.');
        }
      }
    );
  }

  createCourse(newCourse: Course) { // when user click on 'submit' button in modal form
    console.log("*************create****************")
    newCourse.imgSource = DEFAULT_IMG_SOURCE;
    this.coursesService.addCourse(newCourse)
      .subscribe({
          next: (nCourse: Course) => {
            this.courses.unshift(nCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
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
    this.destroy$.complete();
  }
}
