import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {CulturalEvent} from "../../../cultural-events/cultural-events/cultural-event";
import {mockCulturalEvents} from "../../../cultural-events/cultural-events/mock-cultural-events";
import {mockCourses} from "../../../courses/courses-list/mock-courses";
import {mockChildren} from "../../../mocks/mock-user";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  @Input()
  user: User = {}

  courses: Course[] = [];
  culturalEvents: CulturalEvent[] = [];
  children: User[] = [];

  coursesMenuItems: string[] = [];
  culturalEventsMenuItems: string[] = [];
  childrenMenuItems: string[] = [];

  isLoading = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.courses = mockCourses;
    this.courses.map((course) => {
      this.coursesMenuItems.push(course.name);
    })

    this.culturalEvents = mockCulturalEvents;
    this.culturalEvents.map((culturalEvent) => {
      this.culturalEventsMenuItems.push(culturalEvent.name);
    })

    this.children = mockChildren;
    this.children.map((child) => {
      this.childrenMenuItems.push(child.firstName + " " + child.lastName);
    })
  }
}
