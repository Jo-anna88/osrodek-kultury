import {Component, OnInit} from '@angular/core';
import {ICourse} from "../classes/course";
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ClassesService} from "../classes.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course$! : Observable<ICourse>; // the exclamation mark acts as a non-null assertion operator
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classesService: ClassesService
  ) {}
  ngOnInit() {
    this.course$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.classesService.getCourseById(+params.get('id')!)) // converting a string to a number by using the ‘+’ unary operator.
    );
  }
}
