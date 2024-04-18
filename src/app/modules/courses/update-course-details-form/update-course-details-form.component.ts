import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonAction, ModalConfiguration} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {CourseDetails} from "../course";
import {first, Subscription} from "rxjs";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";

@Component({
  selector: 'app-update-course-details-form',
  templateUrl: './update-course-details-form.component.html',
  styleUrls: ['./update-course-details-form.component.scss']
})
export class UpdateCourseDetailsFormComponent implements OnInit, OnDestroy {
  data: CourseDetails = {};
  protected readonly buttonAction = ButtonAction;
  isLoading: boolean = false;
  updateCourseDetailsForm!: FormGroup;
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  subscription = new Subscription();
  constructor(private fb: FormBuilder, private modalService: ModalService, private addressService: AddressService) {}

  get location() {
    return this.updateCourseDetailsForm.get('location')!;
  }

  ngOnInit() {
    this.initConfigData();
    this.loadData();
  }

  initConfigData() {
    this.subscription = this.modalService.getConfiguration()
      .pipe(first())
      .subscribe(
        {
          next: (config: ModalConfiguration) => {this.data = config.data;},
          complete: () => {this.subscription.unsubscribe();}
        }
      );
  }

  loadData() {
    this.isLoading = true;
    this.addressService.getLocations().subscribe({
      next: locations => {
        this.locations = locations;
        this.populateForm();
      },
      error: (err) => {console.log(err); this.isLoading = false;},
      complete: () => {this.isLoading = false;}
    });
  }

  private populateForm() {
    let originalLocationIndex = this.locations.findIndex(location => location.id = this.data.location?.id);
    this.selectedLocation = this.locations[originalLocationIndex]; // init selected location value
    this.updateCourseDetailsForm = this.fb.group({
      minAge: [this.data.minAge, Validators.required],
      maxAge: [this.data.maxAge, Validators.required],
      price: [this.data.price, Validators.required],
      lessonDurationMinutes: [this.data.lessonDurationMinutes, Validators.required],
      date: [this.data.date, Validators.required],
      location: [originalLocationIndex, Validators.required]
    });
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.updateCourseDetailsForm.value;
    this.selectedLocation = this.locations[this.location.value];
    let updatedCourseDetails: CourseDetails = new CourseDetails(
      formValue.minAge, formValue.maxAge, formValue.price, formValue.lessonDurationMinutes, formValue.date, this.selectedLocation
    )
    this.modalService.emitModalEvent(updatedCourseDetails);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
