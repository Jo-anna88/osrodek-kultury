import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from "./modules/alert/alert.service";
import {alerts} from "./modules/alert/alert-mock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'osrodek-kultury';

  constructor(private modalService: NgbModal, private alertService: AlertService) {
  }

  ngOnInit(): void {
    console.log("alerts will be add");
    //this.alertService.addAlert(alerts[0]);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


}
