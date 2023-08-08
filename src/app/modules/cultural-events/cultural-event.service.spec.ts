import { TestBed } from '@angular/core/testing';

import { CulturalEventService } from './cultural-event.service';

describe('CulturalEventService', () => {
  let service: CulturalEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulturalEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
