import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {SIMPLE_TEXT_SHORT} from "../../../../assets/constants";
import {ADMIN_MOCK, CLIENT_MOCK, EMPLOYEE_MOCK} from "../../mocks/mock-user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: User = {};
  isLoading: boolean = false;
  isSpinner: boolean = false;
  spinnerNote: string = "Please wait...";
  protected readonly Role = Role;

  constructor(private userService: UserService){}

  ngOnInit() {
    //this.user = CLIENT_MOCK;
    //this.user = EMPLOYEE_MOCK;
    //this.user = ADMIN_MOCK;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.toggleSpinner();
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log(user);
      },
      error: (err) => {
        this.isLoading = false;
        this.toggleSpinner();
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
        this.toggleSpinner();
      }
    });
  }

  toggleSpinner() {
    setTimeout(() => {
      this.isSpinner = !this.isSpinner;
    }, 1000);
  }
}
