import { TestBed } from '@angular/core/testing';

import { ModalTestService } from './modal-test.service';

describe('ModalService', () => {
  let service: ModalTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
