import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from "./modules/alert/alert.service";
import {alerts} from "./modules/alert/alert-mock";
import {AuthService} from "./core/authorization/auth.service";
import {Role} from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'osrodek-kultury';
  isUser: boolean = false;
  givenRole: Role | null = null;

  constructor(//private ngbModalService: NgbModal,
              //private alertService: AlertService,
              private authService: AuthService) {
  }

  //ngOnInit(): void {
    //this.alertService.addAlert(alerts[0]);
    //this.alertService.addAllAlerts(alerts.splice(2)); <-- does not work with BehaviorSubject (only the last value is returned)
     /*
    let i = 0;
    setInterval(() => {
      this.alertService.addAlert(alerts[i++]);
    }, 2000);
     */
  //}
  ngOnInit(){
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if(isAuthenticated !== undefined) this.isUser = isAuthenticated;
      }
    }
    )
    this.authService.role$.subscribe({
        next: (role) => {
          this.givenRole = role;
        }
      }
    )
  }

  // public open(modal: any): void {
  //   this.ngbModalService.open(modal); // ng-bootstrap; TODO: is it needed?
  // }

}
