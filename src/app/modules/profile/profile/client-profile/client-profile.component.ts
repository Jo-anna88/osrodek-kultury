import {AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../shared/models/user.model";
import {Course} from "../../../courses/course";
import {CulturalEvent} from "../../../cultural-events/cultural-events/cultural-event";
import {mockCulturalEvents} from "../../../cultural-events/cultural-events/mock-cultural-events";
import {mockCourses} from "../../../courses/courses-list/mock-courses";
import {mockChildren} from "../../../mocks/mock-user";
import {ActivatedRoute, Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {UserService} from "../../../../core/services/user.service";
import {forkJoin} from "rxjs";

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private viewportScroller: ViewportScroller,
              private userService: UserService) {}

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

    forkJoin([
      this.userService.getUserCourses(),
      this.userService.getUserEvents(),
      this.userService.getChildren()
    ]).subscribe({
      next: ([courses, culturalEvents, children]) => {
        this.courses = courses;
        this.courses.map((course) => {
          this.coursesMenuItems.push(course.name);
        })

        this.culturalEvents = culturalEvents;
        this.culturalEvents.map((culturalEvent) => {
          this.culturalEventsMenuItems.push(culturalEvent.name);
        });

        this.children = children;
        this.children.map((child) => {
          this.childrenMenuItems.push(child.firstName + " " + child.lastName);
        });
      },
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    })
  }

  navigateToClass(index: number) {
    let selectedCourseId = this.courses[index].id;
    this.router.navigate(['classes', selectedCourseId]);
    //todo: it could show details of selected class, like Schedule, Attendance and Payments (with redirection to e.g. ePay)
  }

  navigateToCulturalEvent(index: number) {
    //this.isSelected = true;
    //this.typeOfSelectedItem = TypeOfItem.EVENT;
    //this.selectedItem = this.culturalEvents[index];
    let selectedEventId = this.culturalEvents[index].id;
    this.router.navigate(['events', selectedEventId]);
    //todo: it could show reservation details, like Date, Place/Venue, Number of Reserved Tickets
  }

  setSelectedChild(index: number) {
    this.selectedChild = this.children[index];
    this.router.navigate([], {relativeTo: this.route, fragment: 'selected-child-section' });
  }

  updateChild(updatedChild: User) {
    let index = this.children.findIndex(child => child.id === updatedChild.id); // find index in an array
    this.childrenMenuItems[index] = updatedChild.firstName + " " + updatedChild.lastName;
  }

  deleteChild() {
    this.selectedChild = {}
    this.router.navigate([], {relativeTo: this.route });
    let index = this.children.findIndex(child => child.id === this.selectedChild.id); // find index in an array
    this.childrenMenuItems.splice(index, 1); // remove element from array
  }
}
