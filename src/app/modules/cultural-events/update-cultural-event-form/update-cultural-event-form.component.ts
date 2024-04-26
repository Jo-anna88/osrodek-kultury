import {Component, OnInit} from '@angular/core';
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppLocation} from "../../../shared/models/address.model";
import {ModalService} from "../../../core/services/modal.service";
import {AddressService} from "../../../core/services/address.service";
import {CulturalEvent} from "../cultural-event.model";
import {first, forkJoin} from "rxjs";

@Component({
  selector: 'app-update-cultural-event-form',
  templateUrl: './update-cultural-event-form.component.html',
  styleUrls: ['./update-cultural-event-form.component.scss']
})
export class UpdateCulturalEventFormComponent implements OnInit {
  data: {culturalEvent: CulturalEvent} = {culturalEvent: {name: ''}}
  isLoading: boolean = false;
  protected readonly buttonAction = ButtonAction;
  updateCulturalEventForm!: FormGroup;
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};

  constructor(private fb: FormBuilder, private modalService: ModalService, private addressService: AddressService) {}

  get location() {
    return this.updateCulturalEventForm.get('location')!;
  }
    ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    forkJoin([
      this.modalService.getConfiguration().pipe(first()),
      this.addressService.getLocations()
    ]).subscribe({
      next: ([config, locations]) => {
        this.data = config.data;
        this.locations = locations;
        this.populateForm();
      },
      error: () => { this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    });
  }

  populateForm(){
    let originalLocationIndex = this.locations.findIndex(location => location.id = this.data.culturalEvent.location?.id);
    this.selectedLocation = this.locations[originalLocationIndex]; // init selected location value
    this.updateCulturalEventForm = this.fb.group({
      name: [this.data.culturalEvent.name, Validators.required],
      date: [this.data.culturalEvent.date, Validators.required],
      description: [this.data.culturalEvent.description, Validators.required],
      price: [this.data.culturalEvent.price, Validators.required],
      location: [originalLocationIndex, Validators.required]
    })
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.updateCulturalEventForm.value;
    this.selectedLocation = this.locations[this.location.value];
    let updatedCulturalEvent: CulturalEvent = {
      name: formValue.name,
      date: formValue.date,
      description: formValue.description,
      location: this.selectedLocation,
      price: formValue.price
    }
    this.modalService.emitModalEvent(updatedCulturalEvent);
  }
}
