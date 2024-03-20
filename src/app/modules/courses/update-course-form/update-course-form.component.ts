import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, Course, CourseDetails, Teacher} from "../course";
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, forkJoin, Subscription} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {CoursesService} from "../courses.service";
import {AddressService} from "../../../core/services/address.service";

@Component({
  selector: 'app-update-course-form',
  templateUrl: './update-course-form.component.html',
  styleUrls: ['./update-course-form.component.scss']
})
export class UpdateCourseFormComponent implements OnInit, OnDestroy {
  data: {course: Course, courseDetails: CourseDetails} = {
    course: {name: "", teacher: {}, description: "", category: Category.default},
    courseDetails: {}
  }
  protected readonly buttonAction = ButtonAction;
  isLoading: boolean = false;
  updateCourseForm!: FormGroup;
  teachers: Teacher[] = [];
  selectedTeacher: Teacher = {};
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  showDetails: boolean = false;
  subscription = new Subscription();
  constructor(private fb: FormBuilder, private modalService: ModalService,
              private courseService: CoursesService, private addressService: AddressService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // Fetch data from multiple observables and wait for all of them to complete
    forkJoin([
      this.modalService.getConfiguration().pipe(first()),
      this.courseService.getTeachers(),
      this.addressService.getLocations()
    ]).subscribe({
      next: ([config, teachers, locations ]) => {
        this.data = config.data;
        this.showDetails = !!this.data.courseDetails.id; // check if details exists

        // fetch teachers data and locations data
        this.teachers = teachers;
        this.locations = locations;

        // populate form
        this.populateForm(); // Call populateForm after all data is fetched

        // track teacher control and optionally location control
        this.trackTeacherControlValue();
        if(this.showDetails) this.trackLocationControlValue();
      },
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    });
  }

  trackTeacherControlValue() {
    this.updateCourseForm.controls['teacher'].valueChanges
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedTeacher = this.teachers[index];
        }
      });
  }

  trackLocationControlValue() {
    this.updateCourseForm.controls['location'].valueChanges
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedLocation = this.locations[index];
        }
      });
  }

  private populateForm() {
    let originalTeacherIndex = this.teachers.findIndex(teacher => teacher.id === this.data.course.teacher.id);
    this.selectedTeacher = this.teachers[originalTeacherIndex]; // init selected teacher value
    if(this.showDetails) {
      let originalLocationIndex = this.locations.findIndex(location => location.id = this.data.courseDetails.location?.id);
      this.selectedLocation = this.locations[originalLocationIndex]; // init selected location value
      this.updateCourseForm = this.fb.group({
        name: [this.data.course.name, Validators.required],
        teacher: [originalTeacherIndex, Validators.required],
        description: [this.data.course.description, Validators.required],
        category: [this.data.course.category, Validators.required],
        maxParticipantsNumber: [this.data.course.maxParticipantsNumber, Validators.required],
        minAge: [this.data.courseDetails.minAge, Validators.required],
        maxAge: [this.data.courseDetails.maxAge, Validators.required],
        price: [this.data.courseDetails.price, Validators.required],
        lessonDurationMinutes: [this.data.courseDetails.lessonDurationMinutes, Validators.required],
        date: [this.data.courseDetails.date, Validators.required],
        location: [originalLocationIndex, Validators.required]
      });
    } else {
      this.updateCourseForm = this.fb.group({
        name: [this.data.course.name, Validators.required],
        teacher: [originalTeacherIndex, Validators.required],
        description: [this.data.course.description, Validators.required],
        category: [this.data.course.category, Validators.required],
        maxParticipantsNumber: [this.data.course.maxParticipantsNumber, Validators.required],
      });
    }
  }

  submit() {
    let formValue = this.updateCourseForm.value;
    let updatedCourse: Course = new Course(this.data.course.imgSource!,
      formValue.name, this.selectedTeacher, formValue.description, formValue.category, formValue.maxParticipantsNumber)
    if(!this.showDetails) {
      this.modalService.emitModalEvent({course: updatedCourse, courseDetails: null});
    } else {
      let updatedCourseDetails: CourseDetails = new CourseDetails(
        formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, this.selectedLocation
      )
      this.modalService.emitModalEvent({course: updatedCourse, courseDetails: updatedCourseDetails});
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
