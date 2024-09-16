import { TestBed } from '@angular/core/testing';

import { TipouserService } from './tipouser.service';

describe('TipouserService', () => {
  let service: TipouserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipouserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
