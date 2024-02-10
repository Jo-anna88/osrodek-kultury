import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCourseFormComponent } from './create-update-course-form.component';

describe('CreateUpdateModalFormComponent', () => {
  let component: CreateUpdateCourseFormComponent;
  let fixture: ComponentFixture<CreateUpdateCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCourseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
