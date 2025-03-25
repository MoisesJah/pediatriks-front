import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-update-btn',
  standalone: true,
  imports: [],
  template: `
    <button type="button" class="btn btn-success btn-sm" (click)="openModal()">
    <i class="bi bi-pencil-square"></i>  
    Actualizar
    </button>
  `,
})
export class UpdateBtnComponent implements ICellRendererAngularComp {

  openModal!: () => void

  agInit(params: ICellRendererParams & { openModal: () => void }): void {
    this.openModal = params.openModal
  }
  refresh(params: ICellRendererParams): boolean {
    return true
  }

}
