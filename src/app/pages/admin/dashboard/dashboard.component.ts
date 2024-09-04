import { Component, AfterViewInit } from '@angular/core';
import flatpickr from 'flatpickr'; // Importa flatpickr directamente
import { BaseOptions } from 'flatpickr/dist/types/options'; // Importación básica para opciones de flatpickr
import { Chart } from 'chart.js/auto'; // Importa Chart.js correctamente
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.initializeFlatpickr();
    this.initializeChart();
  }

  initializeFlatpickr() {
    // Configuración de Flatpickr para seleccionar un rango de fechas
    const options: Partial<BaseOptions> = {
      mode: 'range', // Especifica correctamente el tipo "range"
      dateFormat: 'Y-m-d', // Formato de la fecha
      onChange: (selectedDates: Date[], dateStr: string, instance: any) => { // Usa 'any' temporalmente para evitar errores
        console.log('Selected range:', dateStr);
        // Aquí puedes actualizar la interfaz o manejar la lógica necesaria
      }
    };

    // Obtén el elemento directamente en lugar de usar un selector de cadena para evitar el error de tipo
    const dateRangePicker = document.querySelector('#dateRangePicker') as HTMLElement;

    if (dateRangePicker) {
      // Inicializa Flatpickr en el elemento seleccionado
      flatpickr(dateRangePicker, options);
    }
  }

  initializeChart() {
    const ctx = document.getElementById('kt_charts_widget_20') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [{
            label: 'Revenue',
            data: [12000, 15000, 8000, 18000],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  }
}
