import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-info-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-asistencias.component.html',
})
export class InfoAsistenciasComponent implements OnInit {
  personalService = inject(PersonalService);
  router = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;
  atencionesList = new Observable();
  theme = inject(ThemeService);

  id_personal = this.router.snapshot.params['id'];

  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  permisosList = []
  tardanzaList = []
  faltasList = []

  ngOnInit(): void {
    this.getAsistencias()
  }

  getAsistencias() {
    this.personalService
      .getAsistencias({ id_personal: this.id_personal })
      .pipe(untilDestroyed(this))
      .subscribe(({ data }) => {
        this.permisosList = data.permisos;
        this.tardanzaList = data.tardanzas;
        this.faltasList = data.faltas;
      });
  }
}
