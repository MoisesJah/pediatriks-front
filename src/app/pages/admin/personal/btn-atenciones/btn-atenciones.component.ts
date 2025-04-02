import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-atenciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './btn-atenciones.component.html',
})
export class BtnAtencionesComponent implements ICellRendererAngularComp {
  url = '';

  agInit(params: ICellRendererParams): void {
    this.url = params.data.id_personal;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
