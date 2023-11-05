import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ICourse} from "./course";
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert/alert.service";
import {AppError, errorStatusToAppErrorMapping} from "../../../shared/models/app-error.model";

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
  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
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
  // todo: do we really need to load data again ???
  addCourse() {
    //show popUp window with data to send - empty fields in form
    let newCourse = new ICourse( "imgSource", "name", "teacher", "description");
    console.log("add course: ", newCourse);
    this.coursesService.addCourse(newCourse)
      .subscribe(
        {next: () => this.loadData()}
      ); // <- when user click on 'send' button in popUp window
  }
  editCourse(course: ICourse) {
    //show popUp window with data to send - not empty fields in form
    console.log("edit course: ", course);
    course.teacher = "New Teacher";
    console.log("course after edition", course);
    this.coursesService.updateCourse(course)
      .subscribe(
        // {next: () => this.loadData()}
      );
  }
  deleteCourse(courseId: string) {
    //show popUp window with question  - Do you really want to delete this course?
    console.log("delete course with id: ", courseId);
    this.coursesService.deleteCourse(courseId)
      .subscribe(
        {next: () => this.loadData()}
      ); // <- when user click 'yes' on popUp window
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
