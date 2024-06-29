import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeFormComponent } from './update-employee-form.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('UpdateEmployeeFormComponent', () => {
  let component: UpdateEmployeeFormComponent;
  let fixture: ComponentFixture<UpdateEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
