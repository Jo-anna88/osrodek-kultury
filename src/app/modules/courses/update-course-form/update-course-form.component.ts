import {Component, OnInit} from '@angular/core';
import {Category, Course, CourseDetails} from "../course.model";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, forkJoin} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {CoursesService} from "../courses.service";
import {AddressService} from "../../../core/services/address.service";
import {UserSimpleData} from "../../../shared/models/user.model";

@Component({
  selector: 'app-update-course-form',
  templateUrl: './update-course-form.component.html',
  styleUrls: ['./update-course-form.component.scss']
})
export class UpdateCourseFormComponent implements OnInit {
  data: {course: Course, courseDetails: CourseDetails} = {
    course: {name: "", teacher: {}, description: "", category: Category.default},
    courseDetails: {}
  }
  protected readonly buttonAction = ButtonAction;
  isLoading: boolean = false;
  updateCourseForm!: FormGroup;
  teachers: UserSimpleData[] = [];
  selectedTeacher: UserSimpleData = {};
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  showDetails: boolean = false;
  constructor(private fb: FormBuilder, private modalService: ModalService,
              private courseService: CoursesService, private addressService: AddressService) {
  }

  get teacher() {
    return this.updateCourseForm.get('teacher')!;
  }
  get location() {
    return this.updateCourseForm.get('location')!;
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
      },
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    });
  }

  private populateForm() {
    // set Teacher if there is a teacher assigned to the course
    let originalTeacherIndex: number = this.initTeacher();
    // populate form with data about course and course details
    if(this.showDetails) {
      let originalLocationIndex = this.initLocation();
      this.populateFormWithCourseWithDetailsData(originalTeacherIndex, originalLocationIndex);
    } else { // populate form with data about course (course details does not exist)
      this.populateFormWithCourseData(originalTeacherIndex);
    }
  }

  // init Teacher if there is a teacher assigned to the course and returns its index from the teachers array
  initTeacher(): number {
    let originalTeacherIndex: number = -1;
    if(this.data.course.teacher !== null) {
      originalTeacherIndex = this.teachers.findIndex(teacher => teacher.id === this.data.course.teacher.id);
      this.selectedTeacher = this.teachers[originalTeacherIndex]; // init selected teacher value
    }
    return originalTeacherIndex;
  }

  // init Location and returns its index from the locations array
  initLocation(): number {
    let originalLocationIndex: number = this.locations.findIndex(location => location.id = this.data.courseDetails.location?.id);
    this.selectedLocation = this.locations[originalLocationIndex]; // init selected location value
    return originalLocationIndex;
  }

  populateFormWithCourseWithDetailsData(originalTeacherIndex: number, originalLocationIndex: number) {
    let initValueForTeacher: number|null = originalTeacherIndex >= 0 ? originalTeacherIndex : null;
    this.updateCourseForm = this.fb.group({
      name: [this.data.course.name, Validators.required],
      teacher: [initValueForTeacher],
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
  }

  populateFormWithCourseData(originalTeacherIndex: number) {
    let initValueForTeacher: number|null = originalTeacherIndex >= 0 ? originalTeacherIndex : null;
    this.updateCourseForm = this.fb.group({
      name: [this.data.course.name, Validators.required],
      teacher: [initValueForTeacher],
      description: [this.data.course.description, Validators.required],
      category: [this.data.course.category, Validators.required],
      maxParticipantsNumber: [this.data.course.maxParticipantsNumber, Validators.required],
    });
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.updateCourseForm.value;
    this.selectedTeacher = this.teachers[this.teacher.value];
    let updatedCourse: Course = new Course(this.data.course.imgSource!,
      formValue.name, this.selectedTeacher, formValue.description, formValue.category, formValue.maxParticipantsNumber)
    if(!this.showDetails) {
      this.submitCourse(updatedCourse);
    } else {
      this.submitCourseWithDetails(updatedCourse, formValue);
    }
  }

  submitCourse(updatedCourse: Course){
    this.modalService.emitModalEvent({course: updatedCourse, courseDetails: null});
  }
  submitCourseWithDetails(updatedCourse: Course, formValue: any) {
    this.selectedLocation = this.locations[this.location.value];
    let updatedCourseDetails: CourseDetails = new CourseDetails(
      formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, this.selectedLocation
    )
    this.modalService.emitModalEvent({course: updatedCourse, courseDetails: updatedCourseDetails});
  }
}
