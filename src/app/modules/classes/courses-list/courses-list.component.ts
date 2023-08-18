import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ICourse} from "./course";
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";

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
  constructor(private classesService: CoursesService,
              private router: Router){
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // first solution:
    this.classesService.getCourses()
      //.pipe(delay(5000))
      .subscribe({ //Partial<Observer<ICulturalEvent[]>> | ((value: ICulturalEvent[]) => void) | undefined
        next: (value: ICourse[]) => {
          this.courses = value;
        },
        error: (err: any) => {
          console.error('error during loading the classes: ' + err);
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
