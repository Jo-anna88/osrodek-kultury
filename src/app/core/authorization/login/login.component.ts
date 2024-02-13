import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Credentials} from "../../../shared/models/user.model";
import {first, Subject, Subscription, takeUntil} from "rxjs";
import {ModalService} from "../../services/modal.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {ModalType} from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  form: FormGroup;
  subscription = new Subscription();

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
    if (this.form.value) {
      event.preventDefault();
      this.logIn();
    }
  }

  ngOnInit() {
  }

  logIn() {
    const val = this.form.value;
    if (val.email && val.password) {
      let credentials: Credentials = {username: val.email, password: val.password}
      this.authService.logIn(credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (user) => {
              console.log("Response after login: ", user)
              if (user) {
                this.userService.setCurrentUser({...user});
              } else this.userService.setCurrentUserToNull();
              //const url = this.route.snapshot.queryParams['requested'];
              //url ? this.router.navigateByUrl(url) :
              this.router.navigate(['landing-page']);
            },
            // error: (err) => { //todo: change this handling errors!
            //   //if(err.status == '403') this.alertService.error("Sorry, the login or password is incorrect.")
            //   //else this.alertService.error("error description")
            //   this.form.reset();
            // }
          }
        )
      this.form.reset();
    }
  }

  signUp() {
    this.modalService.setConfiguration({title: "Create account"});
    this.modalService.openModal(ModalType.SIGNUP);
    this.subscription = this.modalService.getModalEvent()
      .pipe(first()) // it is needed because without it, it sends request many times from modal (?) // first() is null!
      .subscribe({
        next: ({user: newUser, password: pswd}) => {
          this.authService.signUp(newUser, pswd)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (nUser) => {
                console.log("Response after signup: ", nUser);
              }
            })
          //this.subscription.unsubscribe(); // it is needed because without it, it sends request many times from modal (???)
          this.modalService.closeModal();
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
