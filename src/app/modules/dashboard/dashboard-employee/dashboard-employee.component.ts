import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.scss']
})
export class DashboardEmployeeComponent implements OnInit {
  private apiUrl: string = environment.baseUrl + '/api/test';
  text: string = "";
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<any>(this.apiUrl + '/' + 'employee')
      .subscribe({
        next: (response: {text: string}) => {this.text = response.text},
        error: (err) => {console.log(err)}
      })
  }
}
