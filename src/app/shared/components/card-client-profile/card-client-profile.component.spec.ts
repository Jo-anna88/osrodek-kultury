import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClientProfileComponent } from './card-client-profile.component';

describe('CardClientProfileComponent', () => {
  let component: CardClientProfileComponent;
  let fixture: ComponentFixture<CardClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardClientProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
