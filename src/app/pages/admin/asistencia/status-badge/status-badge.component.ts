import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
})
export class StatusBadgeComponent implements ICellRendererAngularComp {
  status = ''
  agInit(params: ICellRendererParams): void {
    this.status = params.data.status.nombre
  }
  refresh(params: ICellRendererParams): boolean {
    return false
  }

}
