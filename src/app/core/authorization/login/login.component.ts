import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {IUser, Role} from "../../../shared/models/user.model";
import {delay, Subscription} from "rxjs";
import {ModalService} from "../../services/modal.service";
import {AlertService} from "../../../modules/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = new Array<Subscription>;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private userService: UserService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  @HostListener('document: keydown.enter', ['$event']) onEnterHandler(event: KeyboardEvent) {
    if(this.form.value) {
      event.preventDefault();
      this.logIn();
    }
  }
  ngOnInit() {
  }

  logIn() {
    console.log("I want to log in.");

    const val = this.form.value;
/*
    if (val.email && val.password) {
      console.log("Email + Password: " + val.email + " " + val.password)
      this.authService.login(val.email, val.password)
        .subscribe(
          (res) => {
            if(res.body) this.userService.setCurrentUser({...res.body});
            else this.userService.setCurrentUserToNull();
            console.log("LoginComponent");
            this.router.navigate(['landing-page']);
            this.form.reset();
          }
        );
    }
*/
    if (val.email && val.password) {
      console.log("login2 test");
      this.subscriptions.push(this.authService.logIn(val.email, val.password)
        .subscribe({
          next: (res) => {
            console.log("Response: ", res)
            if(res.body) this.userService.setCurrentUser({...res.body});
            else this.userService.setCurrentUserToNull();
            this.router.navigate(['landing-page']);
          },
          // error: (err) => { //todo: change this handling errors!
          //   //if(err.status == '403') this.alertService.error("Sorry, the login or password is incorrect.")
          //   //else this.alertService.error("error description")
          //   this.form.reset();
          // }
        }
        )
      )
      this.form.reset();
    }
  }

  signUp() {
    this.router.navigate([{ outlets: { modalOutlet: ['modal', 'signup'] } }]);
    this.subscriptions.push(this.modalService.getEvent().subscribe({
      next: (event) => {
        console.log("************************", event)
        this.modalService.close();
      }
    })
    )
  }

  createAccount($event: any) {
    console.log("Create an account");
    console.log($event);
   // this.toggleModal(); // close modal

    // send POST request to backend
  }

  ngOnDestroy() {
    this.subscriptions.map((subs: Subscription) => subs.unsubscribe());
  }
}
