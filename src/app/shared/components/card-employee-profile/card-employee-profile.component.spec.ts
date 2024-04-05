import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmployeeProfileComponent } from './card-employee-profile.component';

describe('CardEmployeeProfileComponent', () => {
  let component: CardEmployeeProfileComponent;
  let fixture: ComponentFixture<CardEmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEmployeeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
