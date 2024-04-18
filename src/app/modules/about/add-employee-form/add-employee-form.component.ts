import { Component } from '@angular/core';
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../core/services/modal.service";
import {Role} from "../../../shared/models/user.model";

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss']
})
export class AddEmployeeFormComponent {
  protected readonly Role = Role;
  protected readonly buttonAction = ButtonAction;
  addEmployeeForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      role: [Role.Employee, Validators.required],
      position: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.addEmployeeForm.value;
    this.modalService.emitModalEvent({employee: formValue});
  }
}
