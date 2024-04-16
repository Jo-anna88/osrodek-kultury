import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCulturalEventFormComponent } from './update-cultural-event-form.component';

describe('UpdateCulturalEventFormComponent', () => {
  let component: UpdateCulturalEventFormComponent;
  let fixture: ComponentFixture<UpdateCulturalEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCulturalEventFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCulturalEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
