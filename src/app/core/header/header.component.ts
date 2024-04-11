import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {mockNavbarItems} from "./mock-navbar-items";
import {UserService} from "../services/user.service";
import {AuthService} from "../authorization/auth.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {map} from "rxjs";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // navigation items
  items: string[] = mockNavbarItems;

  // login button functionality
  @Input()
  isUser: boolean = false;

  // about dropdown functionality
  isAboutDropdown = false;
  isAboutPage = false;
  activeAboutItem = -1;

  // profile dropdown functionality
  isProfileDropdown = false;
  profileDropdownTitle = "";

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService) {}

  ngOnInit() {
    this.checkIsUser();
  }

  checkIsUser() {
    this.isUser = this.storageService.exists("fullname");
  }

  toggleProfileDropdown() {
    // show dropdown
    this.isProfileDropdown = !this.isProfileDropdown;
    // get user's name and surname to set the dropdown title
    if(this.isProfileDropdown) {
      let fullName = this.storageService.get("fullname");
      if (fullName) {this.profileDropdownTitle = fullName}
      //this.loadData();
    }
  }

  toggleAboutDropdown() {
    this.isAboutDropdown = !this.isAboutDropdown;
  }

  // loadData() {
  //   this.userService.getUserBasicData().subscribe({
  //       next: (res: { firstName: string, lastName: string }) => {
  //         this.profileDropdownTitle = res.firstName + " " + res.lastName;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     }
  //   )
  // }

  selectNavItem() { // select navigation item other than 'about'
    this.isAboutDropdown = false;
    this.isAboutPage = false;
    this.activeAboutItem = -1;
  }

  navigateToCompanyPage(i: number) {
    this.isAboutDropdown = false;
    this.isAboutPage = true;
    this.activeAboutItem = i;
    this.router.navigate(['about-company']);
  }

  navigateToTeamPage(i: number) {
    this.isAboutDropdown = false;
    this.isAboutPage = true;
    this.activeAboutItem = i;
    this.router.navigate(['about-team']);
  }

  navigateToLocationsPage(i: number) {
    this.isAboutDropdown = false;
    this.isAboutPage = true;
    this.activeAboutItem = i;
    this.router.navigate(['about-locations']);
  }

  navigateToLandingPage() {
    this.isProfileDropdown = false;
    this.router.navigate(['landing-page']);
  }

  navigateToProfile() {
    this.isProfileDropdown = false;
    this.router.navigate(['user/profile']);
  }

  logOut() {
    this.isProfileDropdown = false;
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setNotAuthenticated();
        this.authService.setRoleToNull();
        this.storageService.clear();
        this.ngOnInit();
        this.router.navigate(['/login']);
      }
    });
  }
}
