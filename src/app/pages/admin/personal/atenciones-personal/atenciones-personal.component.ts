import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-atenciones-personal',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './atenciones-personal.component.html',
})
export class AtencionesPersonalComponent implements OnInit {
  personalService = inject(PersonalService)
  isLoading = inject(LoadingService).isLoading
  modal = inject(NgbModal)
  atencionesList = new Observable()
  theme = inject(ThemeService)

  id_personal = ''

  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  colDefs: ColDef[] = []

  close() {
    this.modal.dismissAll();
  }

  ngOnInit(): void {
   this.getLista()
  }

  getLista(){
    this.atencionesList = this.personalService.getAtenciones(this.id_personal).pipe(
      map((res: any) => res.data),
      untilDestroyed(this)
    )
  }
}
