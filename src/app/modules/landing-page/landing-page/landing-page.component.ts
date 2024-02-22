import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "../../../shared/models/user.model";
import {AuthService} from "../../../core/authorization/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  currentUserRole: Role | null = null;
  Role = Role; // Make the enum accessible in the template
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.role$.subscribe({
      next: (role: Role | null) => {
          this.currentUserRole = role;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
