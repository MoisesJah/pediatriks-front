import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudEventService {
  private solicitudProcesadaSubject = new Subject<string>(); // Just emit the ID
  
  // Public observable for components to subscribe to
  solicitudProcesada$ = this.solicitudProcesadaSubject.asObservable();
  constructor() { }

  notifySolicitudProcesada(id_solicitud: string) {
    this.solicitudProcesadaSubject.next(id_solicitud);
  }
}
