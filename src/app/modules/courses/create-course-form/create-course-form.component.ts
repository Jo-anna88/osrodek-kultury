import { Component } from '@angular/core';
import {Category, Course, CourseDetails} from "../course";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-create-course-form',
  templateUrl: './create-course-form.component.html',
  styleUrls: ['./create-course-form.component.scss']
})
export class CreateCourseFormComponent {
  protected readonly buttonAction = ButtonAction;
  createCourseForm: FormGroup;
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  showDetails: boolean = false;
  showDetailsButtonText: string = "Show Course Details";
  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.createCourseForm = this.fb.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      minAge: [''],
      maxAge: [''],
      price: [''],
      maxParticipantsNumber: [''],
      lessonDurationMinutes: [''],
      date: [''],
      roomId: ['']
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetailsButtonText = this.showDetails ? 'Hide Course Details' : 'Show Course Details';
    // Enable/disable validators based on showDetails
    const detailsControls = ['minAge', 'maxAge', 'price', 'maxParticipantsNumber', 'lessonDurationMinutes', 'date', 'roomId'];
    detailsControls.forEach(control => {
      if (this.showDetails) {
        this.createCourseForm.get(control)!.setValidators([Validators.required]);
      } else {
        this.createCourseForm.get(control)!.clearValidators();
      }
      this.createCourseForm.get(control)!.updateValueAndValidity();
    });
  }

  submit() {
    let newCourse: Course = new Course(
      this.createCourseForm.value.name, this.createCourseForm.value.teacher, this.createCourseForm.value.description, this.createCourseForm.value.category)
    if(!this.showDetails) {
      this.modalService.emitModalEvent({course: newCourse, courseDetails: null});
    } else {
      let newCourseDetails: CourseDetails = {
        minAge: this.createCourseForm.value.minAge,
        maxAge: this.createCourseForm.value.maxAge,
        price: this.createCourseForm.value.price,
        maxParticipantsNumber: this.createCourseForm.value.maxParticipantsNumber,
        lessonDurationMinutes: this.createCourseForm.value.lessonDurationMinutes,
        date: this.createCourseForm.value.date,
        roomId: this.createCourseForm.value.room
      }
      this.modalService.emitModalEvent({course: newCourse, courseDetails: newCourseDetails});
    }
  }
}
