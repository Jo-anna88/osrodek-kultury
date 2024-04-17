import {Component, OnInit} from '@angular/core';
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {CulturalEvent, DEFAULT_IMG_SOURCE} from "../cultural-event";

@Component({
  selector: 'app-create-cultural-event-form',
  templateUrl: './create-cultural-event-form.component.html',
  styleUrls: ['./create-cultural-event-form.component.scss']
})
export class CreateCulturalEventFormComponent implements OnInit {
  protected readonly buttonAction = ButtonAction;
  createCulturalEventForm: FormGroup;
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};

  constructor(private fb: FormBuilder, private modalService: ModalService, private addressService: AddressService) {
    this.createCulturalEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: [null, Validators.required]
    })
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
    this.createCulturalEventForm.controls['location'].valueChanges
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedLocation = this.locations[index];
        }
      });
  }

  submit() {
    let formValue = this.createCulturalEventForm.value;
    let newCulturalEvent: CulturalEvent = {
      imgSource: DEFAULT_IMG_SOURCE,
      name: formValue.name,
      date: formValue.date,
      description: formValue.description,
      location: this.selectedLocation,
      price: formValue.price
    }
    this.modalService.emitModalEvent(newCulturalEvent);
  }
}