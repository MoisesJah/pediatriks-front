import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-atenciones',
  standalone: true,
  imports: [],
  templateUrl: './btn-atenciones.component.html',
})
export class BtnAtencionesComponent implements ICellRendererAngularComp {
    openModal!: () => void

  agInit(params: ICellRendererParams<any, any, any> & { openModal: () => void }): void {
    this.openModal = params.openModal
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false
  }

}
