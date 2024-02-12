import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit, OnDestroy {
  private apiUrl: string = environment.baseUrl + '/api/test';
  destroy$: Subject<void> = new Subject<void>();
  text: string = "";
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<any>(this.apiUrl + '/' + 'client', {withCredentials: true})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: {text: string}) => {this.text = response.text},
        error: (err) => {console.log(err)}
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
