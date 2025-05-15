import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-pacientes-lista',
  standalone: true,
  imports: [CommonModule, AgGridAngular, AsyncPipe],
  templateUrl: './pacientes-lista.component.html',
  styleUrl: './pacientes-lista.component.scss',
})
export class PacientesListaComponent implements OnInit {
  paqueteService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);
  localeText = AG_GRID_LOCALE_ES;

  listPacientes = new Observable();

  colDefs: ColDef[] = [
    {
      field: 'paciente.nombre',
      headerName: 'Paciente',
      cellClass: 'fw-bold',
      minWidth: 275,
      filter: true,
    },
    {
      field: 'paquete.nombre',
      headerName: 'Paquete',
    },
    {
      field: 'sesiones_pendientes',
      headerName: 'Sesiones Restantes',
    },
  ];

  ngOnInit(): void {
    this.getLista();
  }

  getLista() {
    this.listPacientes = this.paqueteService.getListPacientes().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  close() {
    this.modal.dismissAll();
  }
}
