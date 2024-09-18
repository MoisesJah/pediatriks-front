import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-horarios-list',
  template: `
      <ul>
        <li *ngFor="let horario of horarios">
          <span class="fw-bolder">{{ getDayWeek(horario.dia_semana) }}:</span>
          {{ getTime(horario.hora_inicio) }} - 
          {{ getTime(horario.hora_fin) }}
        </li>
      </ul>
  `,
})
export class HorariosListComponent implements ICellRendererAngularComp {
  horarios: any;

  agInit(params: ICellRendererParams): void {
    this.horarios = params.data.horarios;
    // console.log(this.params.data);
  }

  getTime(time: string) {
    return time.slice(0, 5);
  }

  getDayWeek (dayWeek: number) {
    return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][dayWeek];
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
