import { TestBed } from '@angular/core/testing';
import { TipoPersonalService } from './tipopersonal.service';

describe('TipoPersonalService', () => {
  let service: TipoPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
