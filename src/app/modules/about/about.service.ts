import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeProfile} from "../../shared/components/card-profile/profile-model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl: string = environment.baseUrl + '/api/user/employees';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Array<EmployeeProfile>> {
    return this.http.get<Array<EmployeeProfile>>(this.apiUrl, {withCredentials: true});
  }
}
