import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {CourseDetails} from "../course";
import {maxAgeValidator} from "../../../core/forms/form-validators";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-course-details-form',
  templateUrl: './create-course-details-form.component.html',
  styleUrls: ['./create-course-details-form.component.scss']
})
export class CreateCourseDetailsFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  protected readonly buttonAction = ButtonAction;
  createCourseDetailsForm: FormGroup;
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  minAgeControl = new FormControl('', [Validators.required]);
  isMinAgeValid: boolean = true;

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
    return this.createCourseDetailsForm.get('minAge')!;
  }

  get maxAge() {
    return this.createCourseDetailsForm.get('maxAge')!;
  }

  get location() {
    return this.createCourseDetailsForm.get('location')!;
  }

  ngOnInit() {
    this.loadData();
    this.trackMinAgeControl(); // to check minAge value when it is typed after maxAge value
  }

  loadData() {
    this.addressService.getLocations().subscribe({
      next: locations => {this.locations = locations;}
    });
  }

  trackMinAgeControl() {
    this.createCourseDetailsForm.controls['minAge'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((age: string) => {
        if (!!age && !!this.maxAge.value) {
          this.isMinAgeValid = this.validateAgeControls(age, this.maxAge.value);
        }
      });
  }

  validateAgeControls(minAge: string, maxAge: string) {
    return +minAge < +maxAge; // cast strings to numbers and validate
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.createCourseDetailsForm.value;
    this.selectedLocation = this.locations[this.location.value];
    this.modalService.emitModalEvent(new CourseDetails(
      formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, this.selectedLocation
    ));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
