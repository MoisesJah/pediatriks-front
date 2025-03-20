import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-tab-paquetes',
  standalone: true,
  imports: [AgGridAngular, CommonModule, NgbAccordionModule],
  templateUrl: './tab-paquetes.component.html',
  styleUrl: './tab-paquetes.component.scss',
})
export class TabPaquetesComponent implements OnInit {
  reporteService = inject(ReporteService);
  activatedRoute = inject(ActivatedRoute);
  theme = inject(ThemeService);

  id_paciente = this.activatedRoute.snapshot.paramMap.get('id');

  historialList = new Observable();
  paquetesList = new Observable();
  historialData = []

  columnDefs: ColDef[] = [
    { field: 'id_pa', headerName: 'ID', filter: true },
    { field: 'num_sesiones', headerName: 'N° Sesiones', filter: true },
    { field: 'metodo_pago', headerName: 'Método de Pago', filter: true },
    { field: 'precio', headerName: 'Precio', filter: true },
    { field: 'fecha_compra', headerName: 'Fecha Compra', filter: true },
  ];

  ngOnInit(): void {
    // this.getHistorial()
    this.getPaquetes();
  }

  getHistorial(id: string) {
   this.reporteService
      .getPaquetes(this.id_paciente!)
      .pipe(
        map((resp: any) =>
          resp.data.compras.flatMap((compra: any) =>
            compra.historial.filter((item: any) => item.id_paq === id)
          )
        ),
        untilDestroyed(this)
      ).subscribe((data) => {
        this.historialData = data;
      })
  }


  // onShow(id: string) {
  //   if (!this.historialData[id]) {
  //     // this.isLoading = true;
  //     this.getHistorial(id).subscribe((data) => {
  //       this.historialData[id] = data; // Store historial data
  //       // this.isLoading = false;
  //     });
  //   }
  // }

  getPaquetes() {
    this.paquetesList = this.reporteService.getPaquetes(this.id_paciente!).pipe(
      map((resp: any) => resp.data.compras),
      untilDestroyed(this)
    );
  }
}
