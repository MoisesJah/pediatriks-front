import { TestBed } from '@angular/core/testing';

import { PermisoPersonalService } from './permiso-personal.service';

describe('PermisoPersonalService', () => {
  let service: PermisoPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
