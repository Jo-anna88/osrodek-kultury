import { TestBed } from '@angular/core/testing';

import { AppHttpInterceptor } from './app-http-interceptor.service';

describe('AppHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppHttpInterceptor = TestBed.inject(AppHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
