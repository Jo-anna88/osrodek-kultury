import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {User, Role} from "../../../shared/models/user.model";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {confirmPasswordValidator, LETTERS_ONLY, PASSWORD_REGEX, PHONE_REGEX} from "../../forms/form-validators";

@Component({
  selector: 'app-sign-up-modal-form',
  templateUrl: './sign-up-modal-form.component.html',
  styleUrls: ['./sign-up-modal-form.component.scss']
})
export class SignUpModalFormComponent {
  signUpForm: FormGroup;
  passwordControl = new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]);
  protected readonly buttonAction = ButtonAction;
  constructor (private fb: FormBuilder, private modalService: ModalService) {
    this.signUpForm  = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(24), Validators.pattern(LETTERS_ONLY)]],
      lastName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(LETTERS_ONLY)]],
      phone: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(PHONE_REGEX)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: this.passwordControl,
      confirmPassword: ['', [Validators.required, confirmPasswordValidator(this.passwordControl)]]
    });
  }

  /** FORM CONTROLS GETTERS */
  get firstName() {
    return this.signUpForm.get('firstName')!;
  }
  get lastName() {
    return this.signUpForm.get('lastName')!;
  }
  get phone() {
    return this.signUpForm.get('phone')!;
  }
  get dob() {
    return this.signUpForm.get('dob')!;
  }
  get email() {
    return this.signUpForm.get('email')!;
  }
  get password() {
    return this.signUpForm.get('password')!;
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')!;
  }

  submit() {
    let value = this.signUpForm.value;
    let newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
      dob: value.dob,
      username: value.email,
      role: Role.Client
    }
    let pswd = value.password;
    let data: {user: User, password: string} = {user: newUser, password: pswd}
    this.modalService.emitModalEvent(data);
  }
  close() {
    this.modalService.closeModal();
  }
}
