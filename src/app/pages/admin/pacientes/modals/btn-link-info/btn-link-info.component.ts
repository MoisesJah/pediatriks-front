import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-link-info',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      class="btn btn-light-info btn-flex btn-sm rounded-pill"
      [routerLink]="['/admin/pacientes', url]"
    >
      <i class="ki-duotone ki-book fs-3">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </i>
      Ver Info
    </a>
  `,
  styleUrl: './btn-link-info.component.scss',
})
export class BtnLinkInfoComponent implements ICellRendererAngularComp {
  url = '';

  agInit(params: ICellRendererParams): void {
    this.url = params.data.id_paciente;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
