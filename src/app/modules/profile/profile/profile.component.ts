import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../shared/models/user.model";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: User = {username: ""};
  isClient: boolean = false;
  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        this.isClient = (this.user.role === Role.Client);
      },
      error: (err) => {console.log(err);}
    })
  }
}
