import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent implements ICellRendererAngularComp {
  status!: string;

  agInit(params: ICellRendererParams) {
    this.status = params.data.estado ?? params.data.status;
  }

  refresh() {
    return false;
  }
}
