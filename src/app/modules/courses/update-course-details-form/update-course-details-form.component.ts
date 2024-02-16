import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {CourseDetails} from "../course";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-update-course-details-form',
  templateUrl: './update-course-details-form.component.html',
  styleUrls: ['./update-course-details-form.component.scss']
})
export class UpdateCourseDetailsFormComponent implements OnInit, OnDestroy {
  data: CourseDetails = {};
  protected readonly buttonAction = ButtonAction;
  updateCourseDetailsForm!: FormGroup;
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
    this.updateCourseDetailsForm = this.fb.group({
      minAge: [this.data.minAge, Validators.required],
      maxAge: [this.data.maxAge, Validators.required],
      price: [this.data.price, Validators.required],
      maxParticipantsNumber: [this.data.maxParticipantsNumber, Validators.required],
      lessonDurationMinutes: [this.data.lessonDurationMinutes, Validators.required],
      date: [this.data.date, Validators.required],
      roomId: [this.data.roomId, Validators.required]
    });
  }


  submit() {
    this.modalService.emitModalEvent({id: this.data.id, ...this.updateCourseDetailsForm.value} as CourseDetails);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
