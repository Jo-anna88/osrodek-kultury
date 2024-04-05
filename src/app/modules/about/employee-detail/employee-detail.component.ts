import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {EmployeeProfile} from "../../../shared/components/card-team-member-profile/profile-model";
import {CoursesService} from "../../courses/courses.service";
import {CourseBasicInfo} from "../../courses/course";

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
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe({
        next: (profile: EmployeeProfile) => {
          this.employeeProfile = profile
          if (profile.position === 'Teacher') {
            this.getCourses();
          }
        }
      })
  }

  getCourses() {
    this.coursesService.getCoursesLedByTeacher(this.employeeId)
      .subscribe({
        next: (coursesBasic: CourseBasicInfo[]) => {
          this.coursesBasic = coursesBasic;
          this.coursesBasic.map((course) => {
            this.coursesMenuItems.push(course.name!);
          })
        }
      });
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.coursesBasic[index].id;
    this.router.navigate(['classes', selectedCourseId]);
  }
}
