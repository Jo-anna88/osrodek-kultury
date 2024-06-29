import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildFormComponent } from './add-child-form.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('ChildAccountFormComponent', () => {
  let component: AddChildFormComponent;
  let fixture: ComponentFixture<AddChildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChildFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
