import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ICourse} from "./course";
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";
import {ModalService} from "../../../shared/components/modal/modal.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ModalUserConfirmationComponent
} from "../../../shared/components/modal-user-confirmation/modal-user-confirmation.component";

@Component({
  selector: 'app-classes',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  courses: ICourse[] = [];
  isLoading: boolean = false;
  spinnerNote: string = "Classes are loading...";
  appError: AppError = {status: -1, statusTxt: "", description: ""};
  selectedCourseId = "";
  courseDialog={}

  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              protected modalService: ModalService,
              public dialog: MatDialog,
              private router: Router) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // first solution:
    this.coursesService.getCourses()
      //.pipe(delay(5000))
      //.pipe(retry(3)) // to deal with slow connection
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: ICourse[]) => {
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

  openCourseDialog(course: ICourse): void { // for add and edit course

  }

  addCourse() {
    //show popUp window with data to send - empty fields in form
    let newCourse = new ICourse( "assets/icons/ballet-shoes.png", "name", "teacher", "description");
    this.modalService.open('modal-add');
    this.coursesService.addCourse(newCourse)
      .subscribe(
        {next: (nCourse: ICourse) => {
            this.courses.unshift(nCourse); // unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
          }
        }
      ); // <- when user click on 'send' button in popUp window
  }
  editCourse(course: ICourse) {
    //show popUp window with data to send - not empty fields in form
    this.selectedCourseId = course.id!;
    let updatedCourse = {...course};
    updatedCourse.teacher = "New Teacher"; // for testing purposes
    this.coursesService.updateCourse(updatedCourse)
      .subscribe(
         {next: (uCourse) => {
             let index = this.courses.findIndex(c => c.id === uCourse.id); // find index in an array
             this.courses[index] = uCourse;
           }}
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
