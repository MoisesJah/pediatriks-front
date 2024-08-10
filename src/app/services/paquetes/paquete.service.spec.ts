import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaqueteService } from './paquete.service';
import { Paquete } from './paquete.service';

describe('PaqueteService', () => {
  let service: PaqueteService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost/api/paquetes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaqueteService]
    });

    service = TestBed.inject(PaqueteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    it('should return an Observable<Paquete[]>', () => {
      const dummyPaquetes: Paquete[] = [
        { id_paquetes: 'uuid1', id_administrado: 'uuid2', nombre: 'Paquete 1', descripcion: 'Descripción 1', cantidadsesiones: 10, precioregular: 100.00, descuento: 10.00, preciopaquete: 90.00, fechainicio: '2024-01-01', fechafin: '2024-12-31', sesionesrestantes: 10, fechacreacion: '2024-01-01T00:00:00Z', fechamodificacion: '2024-01-01T00:00:00Z', estado: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        // Agrega más objetos de Paquete si es necesario
      ];

      service.getAll().subscribe(paquetes => {
        expect(paquetes.length).toBe(1);
        expect(paquetes).toEqual(dummyPaquetes);
      });

      const req = httpMock.expectOne(`${apiUrl}/list`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPaquetes);
    });
  });

  describe('#getById', () => {
    it('should return an Observable<Paquete>', () => {
      const dummyPaquete: Paquete = { id_paquetes: 'uuid1', id_administrado: 'uuid2', nombre: 'Paquete 1', descripcion: 'Descripción 1', cantidadsesiones: 10, precioregular: 100.00, descuento: 10.00, preciopaquete: 90.00, fechainicio: '2024-01-01', fechafin: '2024-12-31', sesionesrestantes: 10, fechacreacion: '2024-01-01T00:00:00Z', fechamodificacion: '2024-01-01T00:00:00Z', estado: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' };

      service.getById('uuid1').subscribe(paquete => {
        expect(paquete).toEqual(dummyPaquete);
      });

      const req = httpMock.expectOne(`${apiUrl}/list/uuid1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPaquete);
    });
  });

  describe('#create', () => {
    it('should create a new Paquete and return it', () => {
      const dummyPaquete: Paquete = { id_paquetes: 'uuid1', id_administrado: 'uuid2', nombre: 'Paquete 1', descripcion: 'Descripción 1', cantidadsesiones: 10, precioregular: 100.00, descuento: 10.00, preciopaquete: 90.00, fechainicio: '2024-01-01', fechafin: '2024-12-31', sesionesrestantes: 10, fechacreacion: '2024-01-01T00:00:00Z', fechamodificacion: '2024-01-01T00:00:00Z', estado: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' };

      service.create(dummyPaquete).subscribe(paquete => {
        expect(paquete).toEqual(dummyPaquete);
      });

      const req = httpMock.expectOne(`${apiUrl}/add`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(dummyPaquete);
      req.flush(dummyPaquete);
    });
  });

  describe('#update', () => {
    it('should update the Paquete and return it', () => {
      const dummyPaquete: Paquete = { id_paquetes: 'uuid1', id_administrado: 'uuid2', nombre: 'Paquete 1', descripcion: 'Descripción 1', cantidadsesiones: 10, precioregular: 100.00, descuento: 10.00, preciopaquete: 90.00, fechainicio: '2024-01-01', fechafin: '2024-12-31', sesionesrestantes: 10, fechacreacion: '2024-01-01T00:00:00Z', fechamodificacion: '2024-01-01T00:00:00Z', estado: 1, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' };

      service.update('uuid1', dummyPaquete).subscribe(paquete => {
        expect(paquete).toEqual(dummyPaquete);
      });

      const req = httpMock.expectOne(`${apiUrl}/edit/uuid1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dummyPaquete);
      req.flush(dummyPaquete);
    });
  });

  describe('#delete', () => {
    it('should delete the Paquete', () => {
      service.delete('uuid1').subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/delete/uuid1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
