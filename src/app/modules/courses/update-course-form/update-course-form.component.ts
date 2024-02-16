import {Component, OnDestroy} from '@angular/core';
import {Category, Course, CourseDetails} from "../course";
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, Subscription} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-update-course-form',
  templateUrl: './update-course-form.component.html',
  styleUrls: ['./update-course-form.component.scss']
})
export class UpdateCourseFormComponent implements OnDestroy {
  data: {course: Course, courseDetails: CourseDetails} = {
    course: {name: "", teacher: "", description: "", category: Category.default},
    courseDetails: {}
  }
  protected readonly buttonAction = ButtonAction;
  updateCourseForm!: FormGroup;
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  showDetails: boolean = false;
  showDetailsButtonText: string = "Show Course Details";
  subscription = new Subscription();
  constructor(private fb: FormBuilder, private modalService: ModalService) {
  }

  ngOnInit() {
    this.subscription = this.modalService.getConfiguration()
      .pipe(first())
      .subscribe(
        {
          next: (config: ModalConfiguration) => {
            this.data = config.data;
            this.populateForm();
            this.subscription.unsubscribe();
          }
        }
      );
  }

  private populateForm() {
    this.updateCourseForm = this.fb.group({
      name: [this.data.course.name, Validators.required],
      teacher: [this.data.course.teacher, Validators.required],
      description: [this.data.course.description, Validators.required],
      category: [this.data.course.category, Validators.required],
      minAge: [this.data.courseDetails.minAge],
      maxAge: [this.data.courseDetails.maxAge],
      price: [this.data.courseDetails.price],
      maxParticipantsNumber: [this.data.courseDetails.maxParticipantsNumber],
      lessonDurationMinutes: [this.data.courseDetails.lessonDurationMinutes],
      date: [this.data.courseDetails.date],
      roomId: [this.data.courseDetails.roomId]
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetailsButtonText = this.showDetails ? 'Hide Course Details' : 'Show Course Details';
    // Enable/disable validators based on showDetails
    const detailsControls = ['minAge', 'maxAge', 'price', 'maxParticipantsNumber', 'lessonDurationMinutes', 'date', 'roomId'];
    detailsControls.forEach(control => {
      if (this.showDetails) {
        this.updateCourseForm.get(control)!.setValidators([Validators.required]);
      } else {
        this.updateCourseForm.get(control)!.clearValidators();
      }
      this.updateCourseForm.get(control)!.updateValueAndValidity();
    });
  }

  submit() {
    let updatedCourse: Course = new Course(
      this.updateCourseForm.value.name, this.updateCourseForm.value.teacher, this.updateCourseForm.value.description, this.updateCourseForm.value.category)
    if (!this.showDetails) {
      this.modalService.emitModalEvent({course: updatedCourse, courseDetails: null});
    } else {
      let updatedCourseDetails: CourseDetails = {
        minAge: this.updateCourseForm.value.minAge,
        maxAge: this.updateCourseForm.value.maxAge,
        price: this.updateCourseForm.value.price,
        maxParticipantsNumber: this.updateCourseForm.value.maxParticipantsNumber,
        lessonDurationMinutes: this.updateCourseForm.value.lessonDurationMinutes,
        date: this.updateCourseForm.value.date,
        roomId: this.updateCourseForm.value.room
      }
      this.modalService.emitModalEvent({course: updatedCourse, courseDetails: updatedCourseDetails});
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
