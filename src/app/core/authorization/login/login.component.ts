import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {IUser, Role} from "../../../shared/models/user";
import {delay} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      console.log("Email + Password: " + val.email + " " + val.password)
      this.authService.login(val.email, val.password)
        .subscribe(
          (res) => {
            if(res.body) this.userService.setCurrentUser({...res.body});
            else this.userService.setCurrentUserToNull();
            console.log("LoginComponent");
            this.router.navigate(['landing-page']);
          }
        );
    }
  }
}

