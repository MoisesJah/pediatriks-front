import { TestBed } from '@angular/core/testing';

import { FichaResultService } from './ficha-result.service';

describe('FichaResultService', () => {
  let service: FichaResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
