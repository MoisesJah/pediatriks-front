import { Component, OnInit,inject } from '@angular/core';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { SolicitudInventario } from 'src/app/models/solicitud-inventario';
import { LoadingService } from 'src/app/services/loading.service';
import { ActionButtonsComponent } from './acction-buttons/action-buttons/action-buttons.component';

@Component({
  selector: 'app-tabla-solicitudes',
  standalone:true,
  imports: [CommonModule,HeaderComponent,AgGridAngular],
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss']
})
export class TablaSolicitudesComponent implements OnInit {
  solicitudInventarioService = inject(SolicitudInventarioService);
  solicitudes: Observable<SolicitudInventario[]> = new Observable();
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  localeText = AG_GRID_LOCALE_ES;
  solicitudesPendientes: SolicitudInventario[] = [];


  ngOnInit(): void {
    this.fetchSolicitudes();
  }

  colDefs: ColDef[] = [
    {
      headerName: 'Personal Solicitante',
      valueGetter: (params) => params.data.personal_solicita?.nombre || 'N/A',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Ítem Solicitado',
      valueGetter: (params) => params.data.item?.nombre || 'N/A',
      sortable: true,
      filter: true,
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Estado de la Solicitud',
      valueGetter: (params) => params.data.estado?.nombre || 'N/A',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Fecha Solicitud',
      valueGetter: (params) => params.data.fecha_solicitud || 'N/A',
      sortable: true,
      filter: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      headerName: 'Acciones',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        onAcepted: (data: any) => {
          const id_solicitud = data.id_solicitud;
          const id_personal_aprueba = 'personal_id';
          this.aceptarSolicitud(id_solicitud, id_personal_aprueba);
        },
        onDenied: (data: any) => {
          const id_solicitud = data.id_solicitud;
          const id_personal_aprueba = 'personal_id';
          this.negarSolicitud(id_solicitud, id_personal_aprueba);
        },
      },
      maxWidth: 200,
      resizable: false,
    },
  ];

  private fetchSolicitudes(): void {
    this.solicitudes = this.solicitudInventarioService
      .cargarTodasLasSolicitudes()
      .pipe(map((resp) => resp.data));
  }

  loadTabla(){
    this.fetchSolicitudes();
  }


  gridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }

  aceptarSolicitud(id_solicitud:string,id_personal_aprueba:string) {
    this.solicitudInventarioService.aceptarSolicitud(id_solicitud,id_personal_aprueba).subscribe({
      next: () => {
        console.log("Solicitud Aceptada")
         this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s.id_solicitud  !== id_solicitud);
       },
       error: (error) => {
         console.error('Error al aceptar solicitud:', error);
       }
     });
   }


   negarSolicitud(id_solicitud: string, id_personal_aprueba: string) {
    this.solicitudInventarioService.negarSolicitud(id_solicitud, id_personal_aprueba).subscribe({
      next: () => {
        console.log("Solicitud Negada");
        this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s.id_solicitud !== id_solicitud);
      },
      error: (error) => {
        console.error('Error al negar solicitud:', error);
      }
    });
  }


}
