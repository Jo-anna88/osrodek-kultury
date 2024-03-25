import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {CulturalEvent} from "../../../cultural-events/cultural-events/cultural-event";
import {mockCulturalEvents} from "../../../cultural-events/cultural-events/mock-cultural-events";
import {mockCourses} from "../../../courses/courses-list/mock-courses";
import {mockChildren} from "../../../mocks/mock-user";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";

// enum TypeOfItem {
//   COURSE = 'Course',
//   EVENT = 'Event',
//   CHILD = 'Child'
// }

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit, AfterViewChecked {
  @Input()
  user: User = {}

  courses: Course[] = [];
  culturalEvents: CulturalEvent[] = [];
  children: User[] = [];

  coursesMenuItems: string[] = [];
  culturalEventsMenuItems: string[] = [];
  childrenMenuItems: string[] = [];

  isLoading = false;
  spinnerNote = "Data are loading..."

  //isSelected = false;
  //typeOfSelectedItem: TypeOfItem | undefined = undefined;
  selectedChild: User = {};

  constructor(private router: Router, private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewChecked(): void {
    this.route.fragment
      .subscribe((fragment) => {
        if (fragment) {
          //this.viewportScroller.scrollToAnchor(fragment);
          const targetElement = document.getElementById(fragment)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
          } else {
          //this.viewportScroller.scrollToPosition([0,0]);
            window.scrollTo(0, 0);
          }
        }
      });
  }

  loadData() {
    this.isLoading = true;

    setTimeout(() => {
      this.courses = mockCourses;
      if(this.courses.length) {
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })
      }

      this.culturalEvents = mockCulturalEvents;
      if(this.culturalEvents.length) {
        this.culturalEvents.map((culturalEvent) => {
          this.culturalEventsMenuItems.push(culturalEvent.name);
        })
      }

      this.children = mockChildren;
      if(this.children.length) {
        this.children.map((child) => {
          this.childrenMenuItems.push(child.firstName + " " + child.lastName);
        })
      }

      this.isLoading = false;
    }, 2000);
  }

  setSelectedClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
  }

  setSelectedCulturalEvent(index: number) {
    //this.isSelected = true;
    //this.typeOfSelectedItem = TypeOfItem.EVENT;
    //this.selectedItem = this.culturalEvents[index];
    let selectedEventId = this.culturalEvents[index].id;
    this.router.navigate(['events', selectedEventId]);
  }

  setSelectedChild(index: number) {
    this.selectedChild = this.children[index];
    this.router.navigate([], {relativeTo: this.route, fragment: 'selected-child-section' });
  }
}
