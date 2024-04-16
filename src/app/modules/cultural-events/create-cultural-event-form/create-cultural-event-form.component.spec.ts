import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCulturalEventFormComponent } from './create-cultural-event-form.component';

describe('CreateCulturalEventFormComponent', () => {
  let component: CreateCulturalEventFormComponent;
  let fixture: ComponentFixture<CreateCulturalEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCulturalEventFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCulturalEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
