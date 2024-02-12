import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalEventsComponent } from './cultural-events.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CulturalEventsComponent', () => {
  let component: CulturalEventsComponent;
  let fixture: ComponentFixture<CulturalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CulturalEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
