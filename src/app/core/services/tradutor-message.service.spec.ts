import { TestBed } from '@angular/core/testing';

import { TradutorMessageService } from './tradutor-message.service';

describe('TradutorMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradutorMessageService = TestBed.get(TradutorMessageService);
    expect(service).toBeTruthy();
  });
});
