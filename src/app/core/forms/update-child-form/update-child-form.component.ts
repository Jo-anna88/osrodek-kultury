import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {ModalService} from "../../services/modal.service";
import {User} from "../../../shared/models/user.model";
import {first} from "rxjs";

@Component({
  selector: 'app-update-child-form',
  templateUrl: './update-child-form.component.html',
  styleUrls: ['./update-child-form.component.scss']
})
export class UpdateChildFormComponent implements OnInit {
  data: {child: User} = {child: {}}
  protected readonly buttonAction = ButtonAction;
  updateChildAccountForm!: FormGroup;
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
    this.updateChildAccountForm = this.fb.group({
      firstName: [this.data.child.firstName, Validators.required],
      lastName: [this.data.child.lastName, Validators.required],
      phone: [this.data.child.phone, Validators.required],
      dob: [this.data.child.dob, Validators.required]
    });
  }

  submit() {
    let updatedChild = this.updateChildAccountForm.value;
    updatedChild.id = this.data.child.id;
    this.modalService.emitModalEvent({child: updatedChild});
  }
  close() {
    this.modalService.closeModal();
  }
}
