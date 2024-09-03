import { TestBed } from '@angular/core/testing';

import { TipocitaService } from './tipocita.service';

describe('TipocitaService', () => {
  let service: TipocitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
