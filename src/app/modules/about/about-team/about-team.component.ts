import {Component, OnInit} from '@angular/core';
import {EmployeeProfile} from "../../../shared/components/card-profile/profile-model";
import {SIMPLE_TEXT_SHORT} from "../../../../assets/constants";
import {mockEmployee} from "../../mocks/mock-employee";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Role} from "../../../shared/models/user.model";
import {AboutService} from "../about.service";

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss']
})
export class AboutTeamComponent implements OnInit {
  destroy$ = new Subject<void>();

    employees: EmployeeProfile[] = [];
    isLoading = false;
    spinnerNote: string = "Team members are loading...";

    isAuthorized: boolean = true;

    constructor(
      private aboutService: AboutService,
      private modalService: ModalService,
      private authService: AuthService) {

    }
    ngOnInit() {
      this.employees = mockEmployee;
      this.loadData();
      this.setIsAuthorized();
    }

  setIsAuthorized() {
    //this.authService.initAuthStatus(); // for browser refresh
    this.authService.role$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.isAuthorized = (value !== null && value === Role.Admin);
        }
      })
  }

  loadData() {
    this.isLoading = true;
    this.aboutService.getEmployees().subscribe({
      next: (value: EmployeeProfile[]) => {this.employees = value;},
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        },
      complete: () => {this.isLoading = false;}
    })
  }

  openModalCreate() {
    console.log("create")
  }

  openModalUpdate(employee: EmployeeProfile) {
    console.log("update", employee)
  }

  openModalDelete(id: string) {
    console.log("delete employee with id: " + id);
  }
}
