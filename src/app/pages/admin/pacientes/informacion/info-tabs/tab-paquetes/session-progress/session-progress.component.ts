import { Component } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-session-progress',
  standalone: true,
  imports: [NgbProgressbarModule],
  template: `
    <div class="d-flex align-items-center gap-2">
      <span class="fw-bold">
        {{ data.sesiones_pendientes }} / {{ data.sesiones_programadas }}
      </span>
      <ngb-progressbar
        class="flex-grow-1"
        type="primary"
        [value]="data.sesiones_pendientes"
        [max]="data.sesiones_programadas"
      ></ngb-progressbar>
    </div>
  `,
})
export class SessionProgressComponent implements ICellRendererAngularComp {
  data: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.data = params.data;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
