import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClientProfile } from './non-client-profile';

describe('EmployeeAdminProfileComponent', () => {
  let component: NonClientProfile;
  let fixture: ComponentFixture<NonClientProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonClientProfile ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonClientProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
