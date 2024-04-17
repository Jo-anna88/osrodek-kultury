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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // getters defined in the component class are used in the template
  // (e.g., in statements like div [hidden]="email.valid" or in *ngIf="email.errors?.['required']")
  get email() {
    return this.form.get('email')!;
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
    //this.modalService.openModal(ModalType.SIGNUP);
    this.subscription = this.modalService.getModalEvent()
      .pipe(first()) // it is needed because without it, it sends request many times from modal (?) // first() is null!
      .subscribe({
        next: (data: {user: User, password: string}) => {
          this.authService.signUp(data.user, data.password)
            //.pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (value) => {} // void
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
