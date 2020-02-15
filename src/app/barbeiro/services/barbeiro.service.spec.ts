import { TestBed } from '@angular/core/testing';

import { BarbeiroService } from './barbeiro.service';

describe('BarbeiroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarbeiroService = TestBed.get(BarbeiroService);
    expect(service).toBeTruthy();
  });
});
