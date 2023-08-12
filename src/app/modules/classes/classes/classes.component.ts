import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ICourse} from "./course";
import {ClassesService} from "../classes.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  courses: ICourse[] = [];
  isLoading: boolean = false;
  spinnerNote: string = "Classes are loading...";
  constructor(private classesService: ClassesService){
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
