import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDropdownComponent } from './about-dropdown.component';

describe('AboutDropdownComponent', () => {
  let component: AboutDropdownComponent;
  let fixture: ComponentFixture<AboutDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
