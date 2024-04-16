import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalEventsListComponent } from './cultural-events-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CulturalEventsListComponent', () => {
  let component: CulturalEventsListComponent;
  let fixture: ComponentFixture<CulturalEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CulturalEventsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
