import { Component, inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmAsistioComponent } from '../confirm-asistio/confirm-asistio.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-btn-assits',
  standalone: true,
  imports: [],
  template: `
    <button type="button" (click)="openModal()" class="btn btn-sm btn-icon btn-active-color-primary btn-color-gray-800">
      <i class="fa-solid fa-file-lines text-gray-900 fs-1"></i>
      <span>Confirmar</span>
    </button>
  `,
  styleUrl: './btn-assits.component.scss'
})
export class BtnAssitsComponent implements OnInit, ICellRendererAngularComp {
  modal = inject(NgbModal)
  ngOnInit(): void {
    //
  }
  id_session: string = ''
  params: any

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.id_session = params.data.id
  }

  openModal() {
    this.params.openModal(this.id_session)
  }

  refresh(params: ICellRendererParams): boolean {
    return true
  }

}
