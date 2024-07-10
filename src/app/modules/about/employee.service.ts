import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {EmployeeProfile} from "../../shared/models/profile.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {EMPLOYEE_MOCK} from "../mocks/mock-user";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string = environment.baseUrl + '/api/user/employee';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Array<EmployeeProfile>> {
    return this.http.get<Array<EmployeeProfile>>(this.apiUrl);
  }

  getEmployeeById(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }

  getEmployeeProfileById(id: string): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(this.apiUrl + '/' + id + '/profile');
    //return of(EMPLOYEE_MOCK);
  }

  addEmployee(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateEmployee(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  deleteEmployee(id: string): Observable<Object> {
    return this.http.delete(this.apiUrl+ '/' + id);
  }
}
