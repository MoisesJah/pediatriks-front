import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type ActionButtonProps = {
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
  // data: any;
}

@Component({
  selector: 'app-personal-action-buttons',
  template: `
    <div class="d-flex align-items-center gap-2" style="padding-block: 0.15rem">
      <button type="button" (click)="openEdit()" class="btn btn-icon btn-sm bg-success">
        <span class="ki-solid ki-pencil text-white"></span>
      </button>
      <button type="button" (click)="openDelete()" class="btn btn-icon btn-sm btn-danger">
        <span class="ki-solid ki-trash text-white"></span>
      </button>
    </div>
  `,
  styles: ``,
})
export class ActionButtonsComponent
  implements OnInit, ICellRendererAngularComp
{
  ngOnInit(): void {}

  params?: ICellRendererParams & ActionButtonProps

  agInit(params: ICellRendererParams & ActionButtonProps): void {
    this.params = params
  }

  openEdit(){
    this.params?.onEdit(this.params.data)
  }

  openDelete(){
    this.params?.onDelete(this.params.data)
  }

  refresh(params: ICellRendererParams): boolean {
    return true
  }
}
