import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientComponent } from './dashboard-client.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DashboardClientComponent', () => {
  let component: DashboardClientComponent;
  let fixture: ComponentFixture<DashboardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DashboardClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
