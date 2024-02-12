import { TestBed } from '@angular/core/testing';

import { CulturalEventService } from './cultural-event.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CulturalEventService', () => {
  let service: CulturalEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CulturalEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
