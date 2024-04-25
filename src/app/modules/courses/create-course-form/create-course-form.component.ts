import {Component, OnInit} from '@angular/core';
import {Category, Course, CourseDetails, DEFAULT_ICON_SOURCE} from "../course";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {CoursesService} from "../courses.service";
import {AddressService} from "../../../core/services/address.service";
import {UserSimpleData} from "../../../shared/models/user.model";

@Component({
  selector: 'app-create-course-form',
  templateUrl: './create-course-form.component.html',
  styleUrls: ['./create-course-form.component.scss']
})
export class CreateCourseFormComponent implements OnInit {
  protected readonly buttonAction = ButtonAction;
  createCourseForm: FormGroup;
  teachers: UserSimpleData[] = [];
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  locations: AppLocation[] = [];
  showDetails: boolean = false;
  showDetailsButtonText: string = "Show Course Details";
  constructor(private fb: FormBuilder, private modalService: ModalService,
              private courseService: CoursesService, private addressService: AddressService) {
    this.createCourseForm = this.fb.group({
      name: ['', Validators.required],
      teacher: [null],
      description: ['', Validators.required],
      category: [null, Validators.required],
      maxParticipantsNumber: ['', Validators.required],
      minAge: [''],
      maxAge: [''],
      price: [''],
      lessonDurationMinutes: [''],
      date: [''],
      location: [null]
    });
  }

  get teacher() {
    return this.createCourseForm.get('teacher')!;
  }
  get location() {
    return this.createCourseForm.get('location')!;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // fetch teachers data
    this.courseService.getTeachers().subscribe({
      next: teachers => {this.teachers = teachers}
    });

    // fetch locations data
    this.addressService.getLocations().subscribe({
      next: locations => {this.locations = locations}
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetailsButtonText = this.showDetails ? 'Hide Course Details' : 'Show Course Details';
    // Enable/disable validators based on showDetails
    const detailsControls = ['minAge', 'maxAge', 'price', 'lessonDurationMinutes', 'date', 'location'];
    detailsControls.forEach(control => {
      if (this.showDetails) {
        this.createCourseForm.get(control)!.setValidators([Validators.required]);
      } else {
        this.createCourseForm.get(control)!.clearValidators();
      }
      this.createCourseForm.get(control)!.updateValueAndValidity();
    });
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.createCourseForm.value;
    let selectedTeacher = this.teachers[this.teacher.value];
    let newCourse: Course = new Course(DEFAULT_ICON_SOURCE,
      formValue.name, selectedTeacher, formValue.description, formValue.category, formValue.maxParticipantsNumber)
    if(!this.showDetails) { this.submitCourse(newCourse); }
    else { this.submitCourseWithDetails(newCourse, formValue); }
  }

  submitCourse(newCourse: Course) {
    this.modalService.emitModalEvent({course: newCourse, courseDetails: null});
  }

  submitCourseWithDetails(newCourse: Course, formValue: any) {
    let selectedLocation = this.locations[this.location.value];
    let newCourseDetails: CourseDetails = new CourseDetails(
      formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, selectedLocation
    )
    this.modalService.emitModalEvent({course: newCourse, courseDetails: newCourseDetails});
  }
}
