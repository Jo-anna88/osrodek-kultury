import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {mockCourses} from "../../../courses/courses-list/mock-courses";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-child-section',
  templateUrl: './child-section.component.html',
  styleUrls: ['./child-section.component.scss']
})
export class ChildSectionComponent implements OnInit {
  @Input()
  child: User = {}

  courses: Course[] = [];
  coursesMenuItems: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCoursesByUserId(this.child.id!).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })
      }
    })
  }

  navigateToCourse(i: number) {

  }
}
