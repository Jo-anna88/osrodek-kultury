import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../core/services/modal.service";

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
    @Output() onSubmit = new EventEmitter(); // <User>
    //@Output() onClose = new EventEmitter();
  submit() {
    //this.onSubmit.emit(this.signUpForm.value);
    this.modalService.emitEvent(this.signUpForm.value);
  }
  close() {
    this.router.navigate([{ outlets: { modalOutlet: null } }]);
    //this.onClose.emit();
  }

}
