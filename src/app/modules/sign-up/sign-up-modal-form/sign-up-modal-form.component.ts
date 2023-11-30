import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../core/services/modal.service";
import {User, Role} from "../../../shared/models/user.model";

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
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })
  constructor (private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private modalService: ModalService) {}

  submit() {
    let value = this.signUpForm.value;
    let newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
      username: value.email,
      password: value.password, // todo: first we need to validate if password is equal confirmPassword
      role: Role.Client
    }
    this.modalService.emitEvent(newUser);
  }
  close() {
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
  }

}
