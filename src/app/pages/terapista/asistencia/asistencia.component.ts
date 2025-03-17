import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../components/ui/header/header.component';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckAsistenciaComponent } from './check-asistencia/check-asistencia.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize, map, Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { AgGridModule } from 'ag-grid-angular';
import { ThemeService } from 'src/app/services/theme.service';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { formatDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [HeaderComponent, CommonModule, AgGridModule],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss',
})
export class AsistenciaComponent implements OnInit {
  personalService = inject(PersonalService);
  horarios = [];
  auth = inject(AuthService).user()?.personal;
  asistenciaService = inject(AsistenciaService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  modal = inject(NgbModal);

  asistenciaList = new Observable();

  loadingHorario = false;
  btnVisible = true;

  private gridApi!: GridApi;

  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    {
      headerName: 'Fecha',
      field: 'fecha',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
    },
    {
      headerName: 'Hora de Marcado',
      field: 'hora_asistencia',
      filter: 'agDateColumnFilter',
    },
    {
      headerName: 'Status',
      field: 'status.nombre',
      cellClass: 'fw-bold',
      filter: 'agTextColumnFilter',
      minWidth: 250,
    },
  ];

  ngOnInit() {
    this.getHorarios();
    this.getAsistencia();
  }

  loadTabla() {
    this.getAsistencia();
  }

   gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('asistencia-search') as HTMLInputElement).value
    );
  }

  getAsistencia() {
    this.asistenciaList = this.asistenciaService.getByPersonal(this.auth?.id_personal!).pipe(
      map((resp: any) => resp.data)
    );
  }

  getHorarios() {
    this.loadingHorario = true;
    this.personalService
      .getHorario(this.auth?.id_personal!)
      .pipe(
        finalize(() => (this.loadingHorario = false)),
        untilDestroyed(this)
      )
      .subscribe((res) => {
        this.horarios = res.data;
      });
  }

  currentDay = new Date().getDay();

  get showBanner() {
    return this.horarios?.some(
      (horario: any) =>
        horario.dia_semana === this.currentDay &&
        this.convertTimeToMinutes(horario.hora_inicio) <
          this.convertTimeToMinutes(new Date().toTimeString().slice(0, 5))
    );
  }

  get todayHorario() {
    const horario = this.horarios?.find(
      (horario: any) => horario.dia_semana === this.currentDay
    ) as any;
    return horario.hora_inicio;
  }

  convertTimeToMinutes(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Determina si el dia de hoy es un dia del horairo del personal que asiste
   */
  get isCurrentDayInSchedule() {
    return this.horarios?.some(
      (horario: any) => horario.dia_semana === this.currentDay
    );
  }

  openConfirmModal() {
    const modalRef = this.modal.open(CheckAsistenciaComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.todayHorario = this.todayHorario;
    modalRef.componentInstance.showBanner = this.showBanner;

    modalRef.componentInstance.onRequestComplete.subscribe(() => {
      this.btnVisible = false;
      this.getAsistencia();
    });
  }
}
