import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {User, Role} from "../../../shared/models/user.model";
import {ButtonAction} from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-sign-up-modal-form',
  templateUrl: './sign-up-modal-form.component.html',
  styleUrls: ['./sign-up-modal-form.component.scss']
})
export class SignUpModalFormComponent {
  signUpForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });
  protected readonly buttonAction = ButtonAction;
  constructor (private fb: FormBuilder, private modalService: ModalService) {}

  submit() {
    let value = this.signUpForm.value;
    let newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
      username: value.email,
      dob: value.dob,
      // headshot
      role: Role.Client
    }
    let pswd = value.password; // todo: first we need to validate if password is equal to confirmPassword
    let data: {user: User, password: string} = {user: newUser, password: pswd}
    this.modalService.emitModalEvent(data);
  }
  close() {
    this.modalService.closeModal();
  }
}
