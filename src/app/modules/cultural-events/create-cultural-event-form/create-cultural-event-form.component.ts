import {Component, OnInit} from '@angular/core';
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {CulturalEvent, DEFAULT_IMG_SOURCE} from "../cultural-event.model";

@Component({
  selector: 'app-create-cultural-event-form',
  templateUrl: './create-cultural-event-form.component.html',
  styleUrls: ['./create-cultural-event-form.component.scss']
})
export class CreateCulturalEventFormComponent implements OnInit {
  protected readonly buttonAction = ButtonAction;
  createCulturalEventForm: FormGroup;
  locations: AppLocation[] = [];

  constructor(private fb: FormBuilder, private modalService: ModalService, private addressService: AddressService) {
    this.createCulturalEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: [null, Validators.required]
    })
  }

  get location() {
    return this.createCulturalEventForm.get('location')!;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.addressService.getLocations().subscribe({
      next: locations => {this.locations = locations;}
    });
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.createCulturalEventForm.value;
    let selectedLocation = this.locations[this.location.value];
    let newCulturalEvent: CulturalEvent = {
      imgSource: DEFAULT_IMG_SOURCE,
      name: formValue.name,
      date: formValue.date,
      description: formValue.description,
      location: selectedLocation,
      price: formValue.price
    }
    this.modalService.emitModalEvent(newCulturalEvent);
  }
}
