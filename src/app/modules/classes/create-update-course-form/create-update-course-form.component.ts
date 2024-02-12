import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, Course, CourseDetails} from "../course";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'create-update-modal-form',
  templateUrl: './create-update-course-form.component.html',
  styleUrls: ['./create-update-course-form.component.scss']
})
export class CreateUpdateCourseFormComponent implements OnInit {
  @Input() modalTitle: string = "";
  @Input() data: Course = {name: "", teacher: "", description: "", category: Category.default}; // data to initialize a form in case of update action
  @Input() dataDetails: CourseDetails = {}
  @Input() action: ButtonAction = ButtonAction.NONE; // button action
  @Output() onCreateSubmit: EventEmitter<{course: Course, courseDetails: CourseDetails | null}> = new EventEmitter();
  @Output() onUpdateSubmit: EventEmitter<{course: Course, courseDetails: CourseDetails | null}> = new EventEmitter();
  //formFields = new Array<string>();
  form: FormGroup = this.fb.group({
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
    room: ['']
  });
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  showDetails: boolean = false;
  showDetailsButtonText: string = "Show Course Details";
  constructor(private fb: FormBuilder, private modalService: ModalService) {
    //console.log( "data in constructor: ", this.data) // here 'data' is still undefined
  }
  ngOnInit () {
    //this.formFields = Object.keys(this.data);
    if(this.action === ButtonAction.UPDATE) {
      this.populateForm();
    }
  }

  populateForm() { // to initialize fields for update form
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      teacher: [this.data.teacher, Validators.required],
      description: [this.data.description, Validators.required],
      category: [this.data.category, Validators.required],
      minAge: [this.dataDetails.minAge],
      maxAge: [this.dataDetails.maxAge],
      price: [this.dataDetails.price],
      maxParticipantsNumber: [this.dataDetails.maxParticipantsNumber],
      lessonDurationMinutes: [this.dataDetails.lessonDurationMinutes],
      date: [this.dataDetails.date],
      room: [this.dataDetails.roomId]
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetailsButtonText = this.showDetails ? 'Hide Course Details' : 'Show Course Details';
    // Enable/disable validators based on showDetails
    const detailsControls = ['minAge', 'maxAge', 'price', 'maxParticipantsNumber', 'lessonDurationMinutes', 'date', 'room'];
    detailsControls.forEach(control => {
      if (this.showDetails) {
        this.form.get(control)!.setValidators([Validators.required]);
      } else {
        this.form.get(control)!.clearValidators();
      }
      this.form.get(control)!.updateValueAndValidity();
    });
  }

  submit() {
    if(this.action === ButtonAction.UPDATE) { // UPDATE
      this.data.name = this.form.value.name;
      this.data.teacher = this.form.value.teacher;
      this.data.description = this.form.value.description;
      this.data.category = this.form.value.category;
      if (!this.showDetails) {
        this.onUpdateSubmit.emit({course: this.data, courseDetails: null});
      } else {
        this.dataDetails.minAge = this.form.value.minAge;
        this.dataDetails.maxAge = this.form.value.maxAge;
        this.dataDetails.price = this.form.value.price;
        this.dataDetails.maxParticipantsNumber = this.form.value.maxParticipantsNumber;
        this.dataDetails.lessonDurationMinutes = this.form.value.lessonDurationMinutes;
        this.dataDetails.date = this.form.value.date;
        this.dataDetails.roomId = this.form.value.room;
        this.onUpdateSubmit.emit({course: this.data, courseDetails: this.dataDetails});
      }

    }
    else { // CREATE
      let course: Course = new Course(this.form.value.name, this.form.value.teacher, this.form.value.description, this.form.value.category)
      if(!this.showDetails) {
        this.onCreateSubmit.emit({course: course, courseDetails: null});
      } else {
        let courseDetails: CourseDetails = {
          minAge: this.form.value.minAge,
          maxAge: this.form.value.maxAge,
          price: this.form.value.price,
          maxParticipantsNumber: this.form.value.maxParticipantsNumber,
          lessonDurationMinutes: this.form.value.lessonDurationMinutes,
          date: this.form.value.date,
          roomId: this.form.value.room
        }
        this.onCreateSubmit.emit({course: course, courseDetails: courseDetails});
      }
    }

    this.modalService.closeModal();
  }
}
