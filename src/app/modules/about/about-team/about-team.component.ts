import {Component, OnInit} from '@angular/core';
import {EmployeeProfile} from "../../../shared/components/card-team-member-profile/profile-model";
import {SIMPLE_TEXT_SHORT} from "../../../../assets/constants";
import {mockEmployee} from "../../mocks/mock-employee";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {first, Subject, Subscription, takeUntil} from "rxjs";
import {Role, User} from "../../../shared/models/user.model";
import {EmployeeService} from "../employee.service";
import {ModalType} from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss']
})
export class AboutTeamComponent implements OnInit {
  destroy$ = new Subject<void>();

    employees: EmployeeProfile[] = [];
    selectedEmployee: EmployeeProfile = {};
    isLoading = false;
    spinnerNote: string = "Team members are loading...";

    isAuthorized: boolean = false;

    constructor(
      private employeeService: EmployeeService,
      private modalService: ModalService,
      private authService: AuthService) {
    }
    ngOnInit() {
      //this.employees = mockEmployee;
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
    this.employeeService.getEmployees().subscribe({
      next: (value: EmployeeProfile[]) => {this.employees = value;},
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        },
      complete: () => {this.isLoading = false;}
    })
  }

  openModalCreate() {
      this.modalService.setConfiguration({title: "Add a new Employee"});
    let subscription: Subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: {employee: User}) => {
          this.addUser(data.employee);
          //this.subscription.unsubscribe();
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.ADD_EMPLOYEE, subscription);
  }

  openModalUpdate(employee: EmployeeProfile) {
    this.selectedEmployee = employee;
    this.employeeService.getEmployeeById(employee.id!) // get selected course details
      .subscribe({
          next: (employee: User) => { // value === {} if courseDetails does not exist
            this.modalService.setConfiguration({title: "Update employee: " + employee.firstName + " " + employee.lastName,
              data: {employee: employee}})
            //this.modalService.openModal(ModalType.UPDATE_COURSE);
            let subscription: Subscription = this.modalService.getModalEvent()
              .pipe(first())
              .subscribe({
                next: (data: {employee: EmployeeProfile}) => {
                  this.updateEmployee(data.employee);
                  this.modalService.closeModal();
                }
              })
            this.modalService.openModal(ModalType.UPDATE_EMPLOYEE, subscription);
          }
        }
      )
  }

  openModalDelete(employeeId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "employee"});
    //this.modalService.openModal(ModalType.DELETE_CONFIRMATION);
    let subscription = this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if(result) {this.deleteEmployee(employeeId);}
          this.modalService.closeModal();
        }
      });
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  addUser(employee: User) {
    this.employeeService.addEmployee(employee).subscribe({
      next: (newEmployee: User) => {
        this.employees.unshift(newEmployee);
      }
    })
  }

  updateEmployee(employee: User) {
      employee.id = this.selectedEmployee.id;
    this.employeeService.updateEmployee(employee).subscribe({
      next: (updatedEmployee: User) => {
        let index = this.employees.findIndex(e => e.id === updatedEmployee.id); // find index in an array
        this.employees[index] = updatedEmployee;
      }
    })
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (value) => {
        let index = this.employees.findIndex(e => e.id === employeeId); // find index in an array
        this.employees.splice(index, 1); // remove element from array
        //this.alertService.success("The employee was removed.");
      }
    })
  }

}
