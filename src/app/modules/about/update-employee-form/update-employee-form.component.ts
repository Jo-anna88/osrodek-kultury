import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../shared/models/user.model";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-update-employee-form',
  templateUrl: './update-employee-form.component.html',
  styleUrls: ['./update-employee-form.component.scss']
})
export class UpdateEmployeeFormComponent implements OnInit {
  data: {employee: User} = {employee: {}}
  protected readonly Role = Role;
  protected readonly buttonAction = ButtonAction;
  updateEmployeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) {}

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
    this.updateEmployeeForm = this.fb.group({
      firstName: [this.data.employee.firstName, Validators.required],
      lastName: [this.data.employee.lastName, Validators.required],
      phone: [this.data.employee.phone, Validators.required],
      dob: [this.data.employee.dob, Validators.required],
      role: [this.data.employee.role, Validators.required],
      position: [this.data.employee.position, Validators.required],
      description: [this.data.employee.description, Validators.required]
    });
  }

  close() {
    this.modalService.closeModal();
  }

  submit() {
    let formValue = this.updateEmployeeForm.value;
    this.modalService.emitModalEvent({employee: formValue});
  }
}
