import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-create-course-details-form',
  templateUrl: './create-course-details-form.component.html',
  styleUrls: ['./create-course-details-form.component.scss']
})
export class CreateCourseDetailsFormComponent {
  protected readonly buttonAction = ButtonAction;
  createCourseDetailsForm: FormGroup;
  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.createCourseDetailsForm = this.fb.group({
      minAge: ["", Validators.required],
      maxAge: ["", Validators.required],
      price: ["", Validators.required],
      maxParticipantsNumber: ["", Validators.required],
      lessonDurationMinutes: ["", Validators.required],
      date: ["", Validators.required],
      roomId: ["", Validators.required]
    });
  }
  submit() {
    this.modalService.emitModalEvent(this.createCourseDetailsForm.value);
  }
}
