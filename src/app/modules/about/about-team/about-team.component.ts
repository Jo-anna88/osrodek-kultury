import {Component, OnInit} from '@angular/core';
import {EmployeeProfile} from "../../../shared/components/card-team-member-profile/profile-model";
import {NO_DATA_AVAILABLE, SIMPLE_TEXT_SHORT} from "../../../../assets/constants";
import {mockEmployee} from "../../mocks/mock-employee";
import {ModalService} from "../../../core/services/modal.service";
import {AuthService} from "../../../core/authorization/auth.service";
import {first, Subject, Subscription, takeUntil} from "rxjs";
import {Role, User} from "../../../shared/models/user.model";
import {EmployeeService} from "../employee.service";
import {ModalType} from "../../../shared/components/modal/modal";
import {AlertService} from "../../alert/alert.service";

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
  protected readonly NO_DATA_AVAILABLE = NO_DATA_AVAILABLE;

  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private authService: AuthService,
    private alertService: AlertService) {
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
      next: (value: EmployeeProfile[]) => { this.employees = value; },
      error: (err) => { this.isLoading = false; },
      complete: () => { this.isLoading = false; }
    })
  }

  // CREATE EMPLOYEE //
  openModalCreate() {
    this.modalService.setConfiguration({title: "Add a new Employee"});
    let subscription = this.subscribeToAddEmployeeModalEvent();
    this.modalService.openModal(ModalType.ADD_EMPLOYEE, subscription);
  }

  subscribeToAddEmployeeModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: { employee: User }) => {
          this.addEmployee(data.employee);
          this.modalService.closeModal();
        }
      });
  }

  addEmployee(employee: User) {
    this.employeeService.addEmployee(employee).subscribe({
      next: (newEmployee: User) => {
        this.employees.unshift(newEmployee);
      }
    })
  }

  // UPDATE EMPLOYEE //
  openModalUpdate(employee: EmployeeProfile) {
    this.selectedEmployee = employee;
    this.fetchEmployeeDetails(employee);
  }

  fetchEmployeeDetails(employee: EmployeeProfile) { // get selected employee details to update
    this.employeeService.getEmployeeById(employee.id!)
      .subscribe({
        next: (employee: User) => { this.configureUpdateEmployeeModal(employee); }
      });
  }

  configureUpdateEmployeeModal(employee: User) {
    let modalTitle = "Update employee: " + employee.firstName + " " + employee.lastName;
    this.modalService.setConfiguration({
      title: modalTitle,
      data: { employee: employee }
    });

    let modalSubscription = this.subscribeToUpdateEmployeeModalEvent();
    this.modalService.openModal(ModalType.UPDATE_EMPLOYEE, modalSubscription);
  }

  subscribeToUpdateEmployeeModalEvent(): Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (data: { employee: EmployeeProfile }) => {
          this.updateEmployee(data.employee);
          this.modalService.closeModal();
        }
      });
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

  // DELETE EMPLOYEE //
  openModalDelete(employeeId: string) {
    this.modalService.setConfiguration({title: "Delete Confirmation", data: "employee"});
    let subscription = this.subscribeToDeleteEmployeeModalEvent(employeeId);
    this.modalService.openModal(ModalType.DELETE_CONFIRMATION, subscription);
  }

  subscribeToDeleteEmployeeModalEvent(employeeId: string) : Subscription {
    return this.modalService.getModalEvent()
      .pipe(first())
      .subscribe({
        next: (result: boolean) => {
          if (result) { this.deleteEmployee(employeeId); }
          this.modalService.closeModal();
        }
      });
  }

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (value) => {
        let index = this.employees.findIndex(e => e.id === employeeId); // find index in an array
        this.employees.splice(index, 1); // remove element from array
        this.alertService.success("The employee has been removed.");
      }
    })
  }
}
