import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "./core/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'osrodek-kultury';

  constructor(private modalService: NgbModal,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


}
