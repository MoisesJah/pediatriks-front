// src/app/services/horariopersonal/horariopersonal.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HorarioPersonalService } from './horariopersonal.service';
import { HorarioPersonal } from 'src/app/models/horariop';  // Asegúrate de ajustar la ruta al archivo del modelo

describe('HorarioPersonalService', () => {
  let service: HorarioPersonalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HorarioPersonalService]
    });

    service = TestBed.inject(HorarioPersonalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all horarios', () => {
    const mockHorarios: HorarioPersonal[] = [
      { id_horariop: '1', id: '1', id_administrador: '1', horario_iniciop: '08:00', horario_finalp: '17:00', estado: 1, created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null }
      // Añade más objetos de prueba según sea necesario
    ];

    service.getAll().subscribe(horarios => {
      expect(horarios.length).toBe(1);
      expect(horarios).toEqual(mockHorarios);
    });

    const req = httpMock.expectOne('/api/horariopersonal/list');  // Ruta de prueba directa
    expect(req.request.method).toBe('GET');
    req.flush(mockHorarios);
  });

  it('should fetch a horario by ID', () => {
    const mockHorario: HorarioPersonal = { id_horariop: '1', id: '1', id_administrador: '1', horario_iniciop: '08:00', horario_finalp: '17:00', estado: 1, created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null };

    service.getById('1').subscribe(horario => {
      expect(horario).toEqual(mockHorario);
    });

    const req = httpMock.expectOne('/api/horariopersonal/list/1');  // Ruta de prueba directa
    expect(req.request.method).toBe('GET');
    req.flush(mockHorario);
  });

  it('should create a horario', () => {
    const newHorario: HorarioPersonal = { id_horariop: '2', id: '2', id_administrador: '1', horario_iniciop: '09:00', horario_finalp: '18:00', estado: 1, created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null };

    service.create(newHorario).subscribe(horario => {
      expect(horario).toEqual(newHorario);
    });

    const req = httpMock.expectOne('/api/horariopersonal/add');  // Ruta de prueba directa
    expect(req.request.method).toBe('POST');
    req.flush(newHorario);
  });

  it('should update a horario', () => {
    const updatedHorario: HorarioPersonal = { id_horariop: '1', id: '1', id_administrador: '1', horario_iniciop: '10:00', horario_finalp: '19:00', estado: 1, created_at: '2024-01-01', updated_at: '2024-01-01', deleted_at: null };

    service.update('1', updatedHorario).subscribe(horario => {
      expect(horario).toEqual(updatedHorario);
    });

    const req = httpMock.expectOne('/api/horariopersonal/edit/1');  // Ruta de prueba directa
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHorario);
  });

  it('should delete a horario', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('/api/horariopersonal/delete/1');  // Ruta de prueba directa
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
