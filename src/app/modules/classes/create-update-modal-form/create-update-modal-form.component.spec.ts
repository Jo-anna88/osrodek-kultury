import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateModalFormComponent } from './create-update-modal-form.component';

describe('CreateUpdateModalFormComponent', () => {
  let component: CreateUpdateModalFormComponent;
  let fixture: ComponentFixture<CreateUpdateModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateModalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
