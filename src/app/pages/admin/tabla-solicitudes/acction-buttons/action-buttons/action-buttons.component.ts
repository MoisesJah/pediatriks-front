import { Component, inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';

type ActionButtonProps = {
  onAcepted: (data: any) => void;
  onDenied: (data: any) => void;
};

@Component({
  selector: 'app-solicitudes-action-buttons',
  template: `
    <div class="d-flex align-items-center gap-2" style="padding-block: 0.15rem">
      <button
        (click)="aceptarSolicitud(solicitud?.id_solicitud, user?.id)" class="btn btn-sm btn-success me-2">Aceptar</button>
      <button
        (click)="negarSolicitud(solicitud?.id_solicitud, user?.id)" class="btn btn-sm btn-danger me-2">Negar</button>
    </div>
  `,
  styles: ``,
})
export class ActionButtonsComponent
  implements OnInit, ICellRendererAngularComp
{
  authService = inject(AuthService);
  solicitudInventarioService = inject(SolicitudInventarioService);

  solicitud: any; // Define la solicitud actual
  user = this.authService.user(); // Usuario autenticado

  ngOnInit(): void {}

  params?: ICellRendererParams & ActionButtonProps;

  agInit(params: ICellRendererParams & ActionButtonProps): void {
    this.params = params;
    this.solicitud = params.data; // Accede a los datos de la fila actual
  }

  aceptarSolicitud(id_solicitud: string, id_personal_aprueba: string) {
    if (!id_solicitud || !id_personal_aprueba) {
      console.error('Faltan datos para aceptar la solicitud.');
      return;
    }

    this.solicitudInventarioService
      .aceptarSolicitud(id_solicitud, id_personal_aprueba)
      .subscribe({
        next: () => {
          console.log('Solicitud Aceptada');
          if (this.params?.onAcepted) {
            this.params.onAcepted(this.solicitud);
          }
        },
        error: (error) => {
          console.error('Error al aceptar solicitud:', error);
        },
      });
  }

  negarSolicitud(id_solicitud: string, id_personal_aprueba: string) {
    if (!id_solicitud || !id_personal_aprueba) {
      console.error('Faltan datos para negar la solicitud.');
      return;
    }

    this.solicitudInventarioService
      .negarSolicitud(id_solicitud, id_personal_aprueba)
      .subscribe({
        next: () => {
          console.log('Solicitud Negada');
          if (this.params?.onDenied) {
            this.params.onDenied(this.solicitud);
          }
        },
        error: (error) => {
          console.error('Error al negar solicitud:', error);
        },
      });
  }

  refresh(params: ICellRendererParams): boolean {
    this.solicitud = params.data;
    return true;
  }
}
