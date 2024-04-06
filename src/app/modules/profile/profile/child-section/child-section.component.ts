import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {mockCourses} from "../../../courses/courses-list/mock-courses";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-child-section',
  templateUrl: './child-section.component.html',
  styleUrls: ['./child-section.component.scss']
})
export class ChildSectionComponent implements OnInit {
  @Input()
  child: User = {}
  @Output()
  onChildUpdateEvent = new EventEmitter();
  @Output()
  onChildDeleteEvent = new EventEmitter();

  courses: Course[] = [];
  coursesMenuItems: string[] = [];

  constructor(private userService: UserService,
              private router: Router) {}

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

  navigateToClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
  }

  onChildUpdate() {
    // todo: open modal for update child -> update list of children (e.g. by sending updated child and using its id)
    this.onChildUpdateEvent.emit();
  }

  onChildDelete() {
    // todo: open modal for delete child -> update list of children (e.g. by sending id of child and using it)
    this.onChildDeleteEvent.emit();
  }
}
