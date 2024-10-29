import { Component, inject,AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import { BaseOptions } from 'flatpickr/dist/types/options';
import { Chart } from 'chart.js/auto';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { ExtrasModalComponent } from './Modales/extras-modal/extras-modal.component';
import { LoadingService } from 'src/app/services/loading.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ReportesService]
})
export class AdminDashboardComponent implements AfterViewInit {
  chart: any;
  startDate: string = '';
  endDate: string = '';
  montoMin: number = 0;
  showIngresos: boolean = true;
  showEgresos: boolean = true;
  originalData: any[] = [];
  isLoading = inject(LoadingService).isLoading;
  modal = inject(NgbModal);

  constructor(private reportesService: ReportesService, private datePipe: DatePipe) {}

  ngAfterViewInit() {
    this.initializeFlatpickr();
    this.setDefaultDateRange();
    this.loadChartData();
  }


  setDefaultDateRange() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() +1, 0);

  this.startDate = firstDayOfMonth.toISOString().split('T')[0];
  this.endDate = lastDayOfMonth.toISOString().split('T')[0];
}

  initializeFlatpickr() {
    const options: Partial<BaseOptions> = {
      mode: 'range',
      dateFormat: 'Y-m-d',
      onChange: (selectedDates: Date[]) => {
        console.log(selectedDates);
        if (selectedDates.length === 2) {
          this.startDate = this.datePipe.transform(selectedDates[0], 'yyyy-MM-dd')!;
          this.endDate = this.datePipe.transform(selectedDates[1], 'yyyy-MM-dd')!;
          this.applyFilters();
        }
      }
    };

    const dateRangePicker = document.querySelector('#dateRangePicker') as HTMLElement;
    if (dateRangePicker) flatpickr(dateRangePicker, options);
  }

  loadChartData() {
  this.reportesService.getReportesFiltrados(this.startDate, this.endDate, this.montoMin).subscribe((data) => {
    this.originalData = data;
    this.updateChartData(data);
  });
}

  applyFilters() {
    this.reportesService.getReportesFiltrados(this.startDate, this.endDate, this.montoMin).subscribe((data) => {
      this.originalData = data;
      console.log(data);
      this.updateChartData(data);
    });
  }

  updateChartData(data: any) {
    const allData = this.fillMissingDates(data);
    const ingresos = allData.map((reporte: any) => reporte.ingresos || 0);
    const egresos = allData.map((reporte: any) => reporte.egresos || 0);
    const labels = allData.map((reporte: any) => reporte.created_at);

    console.log('Ingresos:', ingresos);
    console.log('Egresos:', egresos);
    console.log('Labels:', labels);

    if (this.chart) {
      this.chart.destroy();
    }


    const ctx = document.getElementById('kt_charts_widget_20') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ingresos',
              data: this.showIngresos ? ingresos : Array(ingresos.length).fill(null),
              borderColor: 'rgba(0, 0, 255, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Egresos',
              data: this.showEgresos ? egresos : Array(egresos.length).fill(null),
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Fecha'
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad'
              }
            }
          }
        }
      });
    }
  }



  fillMissingDates(data: any[]): any[] {
    const daysInMonth = [];
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const report = data.find(r => new Date(r.created_at).toISOString().split('T')[0] === dateString);
      daysInMonth.push({
        created_at: dateString,
        ingresos: report ? report.ingresos : null,
        egresos: report ? report.egresos : null
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysInMonth;
  }


  toggleIngresos() {
    this.showIngresos = !this.showIngresos;
    this.updateChartData(this.originalData);
  }

  toggleEgresos() {
    this.showEgresos = !this.showEgresos;
    this.updateChartData(this.originalData);
  }

  reloadReportTable(): void {
    this.loadChartData();
  }

  openExtrasModal() {
    const modalRef = this.modal.open(ExtrasModalComponent, {
      size: '350px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadChartData();
    });
  }
}
