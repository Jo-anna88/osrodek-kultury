import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {mockNavbarItems} from "./mock-navbar-items";
import {UserService} from "../services/user.service";
import {AuthService} from "../authorization/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // navigation items
  items: string[] = mockNavbarItems;

  // login button functionality
  @Input()
  isUser: boolean = false;

  // about dropdown functionality
  isAboutDropdown = false;

  // profile dropdown functionality
  isProfileDropdown = false;
  profileDropdownTitle = "";

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  toggleProfileDropdown() {
    // show dropdown
    this.isProfileDropdown = !this.isProfileDropdown;
    // get user's name and surname to set the dropdown title
    if(this.isProfileDropdown) {
      this.loadData();
    }
  }

  toggleAboutDropdown() {
    this.isAboutDropdown = !this.isAboutDropdown;
  }

  loadData() {
    this.userService.getUserBasicData().subscribe({
        next: (res: { firstName: string, lastName: string }) => {
          this.profileDropdownTitle = res.firstName + " " + res.lastName;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  navigateToCompanyPage() {
    this.isAboutDropdown = false;
    this.router.navigate(['about-company']);
  }

  navigateToTeamPage() {
    this.isAboutDropdown = false;
    this.router.navigate(['about-team']);
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
      }
    });
    this.router.navigate(['/login']);
  }
}
