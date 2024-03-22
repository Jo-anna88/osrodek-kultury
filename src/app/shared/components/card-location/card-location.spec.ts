import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLocation } from './card-location';

describe('LocationCardComponent', () => {
  let component: CardLocation;
  let fixture: ComponentFixture<CardLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLocation ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
