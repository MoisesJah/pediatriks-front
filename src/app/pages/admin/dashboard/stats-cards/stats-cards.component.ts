import { CommonModule, formatCurrency } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { formatMoney } from 'src/app/utils/formatCurrency';

@UntilDestroy()
@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.component.html',
})
export class StatsCardsComponent implements OnInit {
  isLoading = inject(LoadingService).isLoading;
  reportesService = inject(ReportesService);
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  cardsLoading = false;

  statsList = new Observable();

  icons = [
    '<i class="ki-duotone ki-people fs-2x text-info"><span class="path1"></span> <span class="path2"></span> <span class="path3"></span> <span class="path4"></span> <span class="path5"></span> </i>',
    '<i class="ki-duotone ki-calendar fs-2x text-warning"> <span class="path1"></span> <span class="path2"></span></i>',
    '<i class="ki-duotone ki-user-square fs-2x text-primary"> <span class="path1"></span> <span class="path2"></span> <span class="path3"></span> </i>',
    '<i class="ki-duotone ki-thermometer fs-2x text-primary"> <span class="path1"></span> <span class="path2"></span> </i>',
    '<i class="ki-duotone ki-arrow-up-refraction fs-2x text-success"><span class="path1"></span><span class="path2"></span></i>',
    '<i class="ki-duotone ki-arrow-down-refraction fs-2x text-danger"><span class="path1"></span><span class="path2"></span></i>',
  ];

  ngOnInit(): void {
    this.getStatCards();
  }

  getLoadingState(id: string): BehaviorSubject<boolean> {
    if (!this.loadingStates.has(id)) {
      // Create a new BehaviorSubject with false initial value (not loading)
      const subject = new BehaviorSubject<boolean>(false);
      this.loadingStates.set(id, subject);
    }
    return this.loadingStates.get(id)!;
  }

  getStatCards() {
    this.cardsLoading = true;

    this.statsList = this.reportesService.getStats().pipe(
      map((resp: any) => {
        const stats = Object.keys(resp.data).map((key, index) => {
          let value = resp.data[key];
          if (key === 'Ingresos' || key === 'Egresos') {
            value = formatMoney(value);
          }
          return {
            key,
            value,
            label: ['Ingresos', 'Egresos','Citas'].includes(key) ? 'Este Mes' : 'Total', 
            icon: this.icons[index % this.icons.length],
            loading: this.getLoadingState(resp[key])
          };
        });
        return stats;
      }),
      finalize(() => (this.cardsLoading = false)),
      untilDestroyed(this)
    );
  }
}
