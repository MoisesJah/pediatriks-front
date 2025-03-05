import { Component, inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';

type ActionButtonProps = {
  onAcepted: (id_solicitud: any, id_personal_aprueba: any) => void;
  onDenied: (id_solicitud: any, id_personal_aprueba: any) => void;
};

@Component({
  selector: 'app-solicitudes-action-buttons',
  template: `
    <div class="d-flex align-items-center gap-2" style="padding-block: 0.15rem">
      <button (click)="aceptarSolicitud()" class="btn btn-sm btn-success me-2">
        Aceptar
      </button>
      <button (click)="negarSolicitud()" class="btn btn-sm btn-danger me-2">
        Negar
      </button>
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

  aceptarSolicitud() {
    this.params?.onAcepted(this.solicitud.id_solicitud, this.user!.id);
  }

  negarSolicitud() {
    this.params?.onDenied(this.solicitud.id_solicitud, this.user!.id);
  }

  refresh(params: ICellRendererParams): boolean {
    this.solicitud = params.data;
    return true;
  }
}
