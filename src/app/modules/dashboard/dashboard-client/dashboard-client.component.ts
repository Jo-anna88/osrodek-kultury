import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {DashboardAction} from "../dashboard-actions-model";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent {

  createChildAccount() {
    console.log("create child account")
  }

  protected readonly DashboardAction = DashboardAction;
}
