import { TestBed } from '@angular/core/testing';
import { SolicitudInventarioService } from './solicitud-inventarioservice';



describe('SolicitudInventarioService', () => {
  let service: SolicitudInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
