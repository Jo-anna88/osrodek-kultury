import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../services/modal.service";
import {User} from "../../../shared/models/user.model";
import {first} from "rxjs";

@Component({
  selector: 'app-update-client-form',
  templateUrl: './update-client-form.component.html',
  styleUrls: ['./update-client-form.component.scss']
})
export class UpdateClientFormComponent implements OnInit {
  data: {client: User} = {client: {}}
  protected readonly buttonAction = ButtonAction;
  updateClientAccountForm!: FormGroup;
  constructor (private fb: FormBuilder, private modalService: ModalService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.modalService.getConfiguration().pipe(first())
      .subscribe({
        next: config => {
          this.data = config.data;
          this.populateForm();
        }
      })
  }

  populateForm() {
    this.updateClientAccountForm = this.fb.group({
      firstName: [this.data.client.firstName, Validators.required],
      lastName: [this.data.client.lastName, Validators.required],
      phone: [this.data.client.phone, Validators.required],
      dob: [this.data.client.dob, Validators.required]
    });
  }

  submit() {
    //let updatedClient = this.updateClientAccountForm.value;
    let updatedClient = {...this.data.client, ...this.updateClientAccountForm.value};
    /*
    this.data.client.firstName = this.updateClientAccountForm.get("firstName")?.value;
    this.data.client.lastName = this.updateClientAccountForm.get("lastName")?.value;
    this.data.client.phone = this.updateClientAccountForm.get("phone")?.value;
    this.data.client.dob = this.updateClientAccountForm.get("dob")?.value;
     */
    //updatedChild.id = this.data.child.id;
    console.log(updatedClient);
    this.modalService.emitModalEvent({client: updatedClient});
  }
  close() {
    this.modalService.closeModal();
  }
}
