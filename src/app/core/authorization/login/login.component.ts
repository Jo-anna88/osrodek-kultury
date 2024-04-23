import {Component, HostListener, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Credentials, User, UserSimpleData} from "../../../shared/models/user.model";
import {first, Subject, Subscription, takeUntil} from "rxjs";
import {ModalService} from "../../services/modal.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {StorageService} from "../../services/storage.service";
import {EMAIL_PATTERN_EXTENDED} from "../../forms/form-validators";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  form: FormGroup;
  subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private modalService: ModalService,
              private storageService: StorageService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN_EXTENDED)]],
      password: ['', [Validators.required]]
    });
  }

  // getters defined in the component class are used in the template
  // (e.g., in statements like div [hidden]="email.valid" or in *ngIf="email.errors?.['required']")
  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  @HostListener('document: keydown.enter', ['$event']) onEnterHandler(event: KeyboardEvent) {
    if (this.form.value) {
      event.preventDefault();
      this.logIn();
    }
  }

  logIn() {
    const val = this.form.value;
    if (val.email && val.password) {
      let credentials: Credentials = {username: val.email, password: val.password}
      this.authService.logIn(credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (result: UserSimpleData) => {
              this.storageService.save("fullname", result.firstName + " " + result.lastName);
              this.authService.setAuthenticated();
              this.authService.setRole();
              //const url = this.route.snapshot.queryParams['requested'];
              //url ? this.router.navigateByUrl(url) :
              this.router.navigate(['landing-page']);
            },
            error: (err) => {
              if(err.status === HttpStatusCode.Unauthorized) {
                this.alertService.error("Sorry, the login or password is incorrect.\nPlease try again.");
              }
              this.form.reset();
            }
          }
        )
      this.form.reset();
    }
  }

  signUp() {
    this.modalService.setConfiguration({title: "Create account"});
    //this.modalService.openModal(ModalType.SIGNUP);
    this.subscription = this.modalService.getModalEvent()
      .pipe(first()) // it is needed because without it, it sends request many times from modal (?) // first() is null!
      .subscribe({
        next: (data: {user: User, password: string}) => {
          this.authService.signUp(data.user, data.password)
            //.pipe(takeUntil(this.destroy$))
            .subscribe({
              complete: () => {this.alertService.success("Account created successfully.\nPlease log in.")}
            })
          //this.subscription.unsubscribe(); // it is needed because without it, it sends request many times from modal (???)
          this.modalService.closeModal();
        }
      })
    this.modalService.openModal(ModalType.SIGNUP, this.subscription);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
