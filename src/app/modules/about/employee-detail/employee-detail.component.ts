import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {EmployeeProfile} from "../../../shared/models/profile.model";
import {CoursesService} from "../../courses/courses.service";
import {CourseBasicInfo} from "../../courses/course.model";
import {NO_DATA_AVAILABLE, SPINNER_NOTE_DEFAULT} from "../../../../assets/constants";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string = "";
  employeeProfile: EmployeeProfile = {};
  coursesBasic: CourseBasicInfo[] = [];
  coursesMenuItems: string[] = [];
  isLoading: boolean = false;
  spinnerNote: string = SPINNER_NOTE_DEFAULT;
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;
  protected readonly Object = Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private coursesService: CoursesService
    ) {}
  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.employeeService.getEmployeeProfileById(this.employeeId)
      .subscribe({
        next: (profile: EmployeeProfile) => {
          this.employeeProfile = profile
          if (profile.position === 'Teacher') {
            this.getCourses();
          }
        },
        error: (err) => { this.isLoading = false; },
        complete: () => { this.isLoading = false; }
      })
  }

  getCourses() {
    this.isLoading = true;
    this.coursesService.getCoursesLedByTeacher(this.employeeId)
      .subscribe({
        next: (coursesBasic: CourseBasicInfo[]) => {
          this.coursesBasic = coursesBasic;
          this.coursesBasic.map((course) => {
            this.coursesMenuItems.push(course.name!);
          })
        },
        error: (err) => { this.isLoading = false; },
        complete: () => { this.isLoading = false; }
      });
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.coursesBasic[index].id;
    this.router.navigate(['classes', selectedCourseId]);
  }
}
