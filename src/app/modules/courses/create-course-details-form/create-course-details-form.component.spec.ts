import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseDetailsFormComponent } from './create-course-details-form.component';

describe('CreateCourseDetailsFormComponent', () => {
  let component: CreateCourseDetailsFormComponent;
  let fixture: ComponentFixture<CreateCourseDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCourseDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
