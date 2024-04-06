import {Component} from '@angular/core';
import {DashboardAction} from "../dashboard-actions-model";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {
    protected readonly DashboardAction = DashboardAction;
}
