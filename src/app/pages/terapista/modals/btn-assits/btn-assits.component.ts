import { Component, inject, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from 'src/app/services/citas/cita.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-assits',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-center gap-3 my-4 align-items-center">
      <button
        type="button"
        (click)="handleStatus(id_session, 2)"
        class="btn btn-sm btn-success"
      >
        <i class="ki-duotone ki-calendar-tick fs-1"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span><span class="path6"></span
        ></i>
        <span>Asistió</span>
      </button>
      <button
        *ngIf="params.data.estado.toLowerCase() !== 'no asistió'"
        type="button"
        (click)="handleStatus(id_session, 3)"
        class="btn btn-sm btn-danger"
      >
        <i class="ki-duotone ki-calendar-remove fs-1"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span><span class="path6"></span
        ></i>
        <span>No Asistió</span>
      </button>
    </div>
  `,
  styleUrl: './btn-assits.component.scss',
})
export class BtnAssitsComponent implements OnInit, ICellRendererAngularComp {
  modal = inject(NgbModal);
  citaService = inject(CitaService);
  toastService = inject(ToastrService);

  handleStatus: (id_sesion: string, status: number) => void = () => {};

  ngOnInit(): void {
    //
  }
  id_session: string = '';
  params: any;

  agInit(
    params: ICellRendererParams & {
      handleStatus: (id_sesion: string, status: number) => void;
    }
  ): void {
    this.params = params;
    this.id_session = params.data.id;
    this.handleStatus = params.handleStatus;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
