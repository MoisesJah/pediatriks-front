import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
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
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsComponent } from './modals/action-buttons/action-buttons.component';
import { map, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './users.ag.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users = inject(UserService);
  isLoading = inject(LoadingService);
  modal = inject(NgbModal);
  // params: GridReadyEvent | undefined;

  userList: Observable<IUser[]> = new Observable();

  colDefs: ColDef[] = [
    { field: 'name', headerName: 'Nombre', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true },
    { field: 'telefono', headerName: 'Teléfono' },
    { field: 'email', headerName: 'Correo', filter: true },
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

  private fetchUsers() {
    this.userList = this.users.getAll().pipe(
      map((resp) => {
        return resp.data;
      }),
      untilDestroyed(this)
    );
  }

  ngOnDestroy(): void {
    // this.fetchUsers().unsubscribe();
  }

  /**
   * Opens the create modal and subscribes to
   * the onSaveComplete event to refresh the user list.
   */
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
    modalRef.componentInstance.userForm.patchValue(user);
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
