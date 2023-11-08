import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserConfirmationComponent } from './modal-user-confirmation.component';

describe('ModalUserConfirmationComponent', () => {
  let component: ModalUserConfirmationComponent;
  let fixture: ComponentFixture<ModalUserConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUserConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
