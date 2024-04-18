import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {CourseDetails} from "../course";
import {maxAgeValidator} from "../../../core/forms/form-validators";

@Component({
  selector: 'app-create-course-details-form',
  templateUrl: './create-course-details-form.component.html',
  styleUrls: ['./create-course-details-form.component.scss']
})
export class CreateCourseDetailsFormComponent implements OnInit{
  protected readonly buttonAction = ButtonAction;
  createCourseDetailsForm: FormGroup;
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  minAgeControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private modalService: ModalService, private addressService: AddressService) {
    this.createCourseDetailsForm = this.fb.group({
      minAge: this.minAgeControl,
      maxAge: ['', [Validators.required, maxAgeValidator(this.minAgeControl)]],
      price: ['', Validators.required],
      lessonDurationMinutes: ['', Validators.required],
      date: ['', Validators.required],
      location: [null, Validators.required]
    });
  }

  get minAge() {
    return this.createCourseDetailsForm.get('minAge');
  }

  get maxAge() {
    return this.createCourseDetailsForm.get('maxAge')!;
  }

  ngOnInit() {
    this.loadData();
    this.trackLocationControlValue();
  }

  loadData() {
    this.addressService.getLocations().subscribe({
      next: locations => {this.locations = locations;}
    });
  }

  trackLocationControlValue() {
    this.createCourseDetailsForm.controls['location'].valueChanges
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedLocation = this.locations[index];
        }
      });
  }

  submit() {
    let formValue = this.createCourseDetailsForm.value;
    this.modalService.emitModalEvent(new CourseDetails(
      formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, this.selectedLocation
    ));
  }
}
