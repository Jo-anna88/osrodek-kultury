import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSectionComponent } from './child-section.component';

describe('ChildSectionComponent', () => {
  let component: ChildSectionComponent;
  let fixture: ComponentFixture<ChildSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
