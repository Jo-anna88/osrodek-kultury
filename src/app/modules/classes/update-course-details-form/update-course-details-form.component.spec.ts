import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseDetailsFormComponent } from './update-course-details-form.component';

describe('UpdateCourseDetailsFormComponent', () => {
  let component: UpdateCourseDetailsFormComponent;
  let fixture: ComponentFixture<UpdateCourseDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCourseDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
