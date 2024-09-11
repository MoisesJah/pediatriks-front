import { TestBed } from '@angular/core/testing';

import { SesionstatusService } from './sesionstatus.service';

describe('SesionstatusService', () => {
  let service: SesionstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
