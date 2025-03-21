import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';

@UntilDestroy()
@Component({
  selector: 'app-tab-terapias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-terapias.component.html',
  styleUrl: './tab-terapias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabTerapiasComponent implements OnInit {
  reporteService = inject(ReporteService)
  activatedRoute = inject(ActivatedRoute)
  isLoading = inject(LoadingService).isLoading

  id_paciente = this.activatedRoute.snapshot.paramMap.get('id')

  terapiasList = new Observable()

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.terapiasList = this.reporteService.getTerapias(this.id_paciente!).pipe(
      map((resp:any) => resp.data.terapias),
      untilDestroyed(this)
    )
  }
}
