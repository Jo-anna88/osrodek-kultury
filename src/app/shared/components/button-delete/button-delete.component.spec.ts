import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeleteComponent } from './button-delete.component';
import {MatIconModule} from "@angular/material/icon";

describe('ButtonDeleteComponent', () => {
  let component: ButtonDeleteComponent;
  let fixture: ComponentFixture<ButtonDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ ButtonDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
