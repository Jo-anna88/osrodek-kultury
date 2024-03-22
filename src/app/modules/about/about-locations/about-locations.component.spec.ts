import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLocationsComponent } from './about-locations.component';

describe('AboutLocationsComponent', () => {
  let component: AboutLocationsComponent;
  let fixture: ComponentFixture<AboutLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
