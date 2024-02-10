import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalBtnAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {CourseDetails} from "../course";
import {first, Subject, Subscription} from "rxjs";
import {CoursesService} from "../courses.service";

@Component({
  selector: 'app-update-course-details-form',
  templateUrl: './update-course-details-form.component.html',
  styleUrls: ['./update-course-details-form.component.scss']
})
export class UpdateCourseDetailsFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  title: string = "";
  data: CourseDetails = {};
  protected readonly ModalBtnAction = ModalBtnAction;
  updateCourseForm!: FormGroup;
  subscription = new Subscription();
  constructor(private fb: FormBuilder, private modalService: ModalService, private courseService: CoursesService) {
  }

  ngOnInit() {
    this.subscription = this.modalService.getConfiguration()
        .pipe(first())
        .subscribe(
        {
          next: (config: ModalConfiguration) => {
            this.data = config.data;
            if(config.title) this.title = config.title;
            this.populateForm();
            this.subscription.unsubscribe();
          }
        }
      );
  }

  private populateForm() {
    this.updateCourseForm = this.fb.group({
      minAge: [this.data.minAge, Validators.required],
      maxAge: [this.data.maxAge, Validators.required],
      price: [this.data.price, Validators.required],
      maxParticipantsNumber: [this.data.maxParticipantsNumber, Validators.required],
      lessonDurationMinutes: [this.data.lessonDurationMinutes, Validators.required],
      date: [this.data.date, Validators.required],
      room: [this.data.roomId, Validators.required]
    });
  }


  submit() {
    this.modalService.emitEvent({id: this.data.id, ...this.updateCourseForm.value} as CourseDetails);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
