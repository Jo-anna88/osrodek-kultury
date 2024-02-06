import {Component} from '@angular/core';
import {Role} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  currentUserRole : Role = Role.Client; // default
  Role = Role; // Make the enum accessible in the template
  constructor(private userService: UserService) {
    console.log("Landing Page")
  }

  ngOnInit() {
    let user = this.userService.user$.getValue();
    if (user?.role) {
      this.currentUserRole = user.role;
    }
  }
}
