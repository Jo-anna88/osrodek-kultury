import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  private apiUrl: string = environment.baseUrl + '/api/test';
  text: string = "";
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<any>(this.apiUrl + '/' + 'client', {withCredentials: true})
      .subscribe({
        next: (response: {text: string}) => {this.text = response.text},
        error: (err) => {console.log(err)}
      })
  }
}
