import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ActionButtonsComponent } from './modals/action-buttons/action-buttons.component';
import { map, Observable } from 'rxjs';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users = inject(UserService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);
  isDesktop!: boolean;
  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  userList: Observable<IUser[]> = new Observable();

  colDefs: ColDef[] = [
    { field: 'name', headerName: 'Nombre', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true },
    { field: 'direccion', headerName: 'Dirección', filter: true },
    { field: 'telefono', headerName: 'Teléfono', filter: true },
    { field: 'email', headerName: 'Correo', filter: true },
    {
      field: 'tipo_user.nombre',
      headerName: 'Tipo de Usuario',
      filter: true,
      cellRenderer: (params: any) => {
        switch (params.value) {
          case 'administrador':
            return `<span class="badge badge-light-primary badge-lg">${params.value}</span>`;
          case 'terapista':
            return `<span class="badge badge-light-success badge-lg">${params.value}</span>`;
          case 'paciente':
            return `<span class="badge badge-light-secondary badge-lg">${params.value}</span>`;
          case 'secretaria':
            return `<span class="badge badge-light-warning badge-lg">${params.value}</span>`;
          default:
            return '';
        }
      },
    },
    {
      headerName: 'Acciones',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.openEditModal(data),
        onDelete: (data: any) => this.openDeleteModal(data),
      },
      maxWidth: 100,
      resizable: false,
    },
  ];

  ngOnInit(): void {
    this.fetchUsers();
  }

  //https://stackoverflow.com/questions/72812674/ag-grid-size-to-fit-on-desktop-and-auto-size-on-mobile
  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.sizeColumnsToFit();
  }

  private fetchUsers() {
    this.userList = this.users.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('user-search') as HTMLInputElement).value
    );
  }

  ngOnDestroy(): void {
    // this.fetchUsers().unsubscribe();
  }

  loadTabla() {
    this.fetchUsers();
  }

  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchUsers();
    });
  }

  openEditModal(user: IUser) {
    const modalRef = this.modal.open(EditModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.userId = user.id;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchUsers();
    });
  }

  openDeleteModal(user: IUser) {
    const modalRef = this.modal.open(DeleteModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.userId = user.id;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchUsers();
    });
  }
}
