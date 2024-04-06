import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from "../../../shared/models/user.model";
import {AuthService} from "../../../core/authorization/auth.service";
import {Subscription} from "rxjs";
import {DashboardAction} from "../../dashboard/dashboard-actions-model";
import {StorageService} from "../../../core/services/storage.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  fullName: string = "";
  currentUserRole: Role | null = null;
  Role = Role; // Make the enum accessible in the template
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService, private storageService: StorageService) {
  }

  ngOnInit() {
    this.initFullName();
    //this.currentUserRole = Role.Client
    this.loadData();
  }

  initFullName() {
    let value = this.storageService.get("fullname");
    if(value) {this.fullName = value;}
  }

  loadData() {
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
