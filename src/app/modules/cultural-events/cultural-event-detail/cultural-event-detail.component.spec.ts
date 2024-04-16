import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalEventDetailComponent } from './cultural-event-detail.component';

describe('CulturalEventDetailComponent', () => {
  let component: CulturalEventDetailComponent;
  let fixture: ComponentFixture<CulturalEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
