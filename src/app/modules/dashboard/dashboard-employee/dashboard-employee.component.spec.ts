import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeComponent } from './dashboard-employee.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DashboardEmployeeComponent', () => {
  let component: DashboardEmployeeComponent;
  let fixture: ComponentFixture<DashboardEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DashboardEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
