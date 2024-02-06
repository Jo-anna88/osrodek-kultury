import {Component, OnInit} from '@angular/core';
import {Course, CourseDetails} from "../course";
import {catchError, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CoursesService} from "../courses.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course$! : Observable<Course>; // the exclamation mark acts as a non-null assertion operator
  courseDetails : CourseDetails | null | undefined = undefined;
  //isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    //this.isLoading = true;
    this.course$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          //this.coursesService.getCourseById(+params.get('id')!)) // converting a string to a number by using the ‘+’ unary operator.
          //(if params.get('id'))
          this.coursesService.getCourseById(params.get('id')!)
      )
    );

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.coursesService.getCourseDetailsById(params.get('id')!)
      )
    ).subscribe({
        next: (value: CourseDetails) => {
          this.courseDetails = Object.keys(value).length !== 0 ? value : null;
        }
      }
    );
  }

  protected readonly Object = Object;
}
