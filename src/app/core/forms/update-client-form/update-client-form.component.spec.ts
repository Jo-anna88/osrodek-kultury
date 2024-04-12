import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientFormComponent } from './update-client-form.component';

describe('UpdateChildFormComponent', () => {
  let component: UpdateClientFormComponent;
  let fixture: ComponentFixture<UpdateClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
