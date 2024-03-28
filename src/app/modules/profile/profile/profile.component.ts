import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {SIMPLE_TEXT_SHORT} from "../../../../assets/constants";
import {CLIENT_MOCK} from "../../mocks/mock-user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: User = {};

  protected readonly Role = Role;

  constructor(private userService: UserService){}

  ngOnInit() {
    //this.user = CLIENT_MOCK;
    //this.user = EMPLOYEE_MOCK;

    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log(user);
      },
      error: (err) => {console.log(err);}
    })
  }
}
