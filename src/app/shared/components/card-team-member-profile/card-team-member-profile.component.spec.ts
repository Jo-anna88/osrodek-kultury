import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeamMemberProfileComponent } from './card-team-member-profile.component';

describe('CardTeamMemberProfileComponent', () => {
  let component: CardTeamMemberProfileComponent;
  let fixture: ComponentFixture<CardTeamMemberProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTeamMemberProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTeamMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
