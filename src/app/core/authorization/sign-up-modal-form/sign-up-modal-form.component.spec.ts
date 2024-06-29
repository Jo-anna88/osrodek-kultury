import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpModalFormComponent } from './sign-up-modal-form.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('SignUpModalFormComponent', () => {
  let component: SignUpModalFormComponent;
  let fixture: ComponentFixture<SignUpModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpModalFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
