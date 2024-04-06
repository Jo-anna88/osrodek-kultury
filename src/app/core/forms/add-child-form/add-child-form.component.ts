import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../services/modal.service";
import {Role, User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-add-child-form',
  templateUrl: './add-child-form.component.html',
  styleUrls: ['./add-child-form.component.scss']
})
export class AddChildFormComponent {
  createChildAccountForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required]
  });
  protected readonly buttonAction = ButtonAction;
  constructor (private fb: FormBuilder, private modalService: ModalService) {}

  submit() {
    let formValue = this.createChildAccountForm.value;
    this.modalService.emitModalEvent({child: formValue});
  }
  close() {
    this.modalService.closeModal();
  }
}
