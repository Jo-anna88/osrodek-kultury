import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChildFormComponent } from './update-child-form.component';

describe('UpdateChildFormComponent', () => {
  let component: UpdateChildFormComponent;
  let fixture: ComponentFixture<UpdateChildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChildFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
