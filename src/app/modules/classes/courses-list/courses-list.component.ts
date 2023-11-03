import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ICourse} from "./course";
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";
import {AlertService} from "../../alert/alert.service";
import {AppErrorModel} from "../../../shared/models/app-error.model";

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
  appError: AppErrorModel = {status: -1, statusTxt: "", description: ""};
  constructor(private coursesService: CoursesService,
              private alertService: AlertService,
              private router: Router){
  }
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
          console.error('error during loading the classes: ', err);
          if(err.status === 403) {this.appError = {
            status: err.status,
            statusTxt: "Access Denied",
            description: "Sorry, you do not have permission to access this resource."
          }}
          this.alertService.error('error during loading the classes');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
