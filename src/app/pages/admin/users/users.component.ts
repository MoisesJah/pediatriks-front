import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users = inject(UserService);
  isLoading = inject(LoadingService);
  modal = inject(NgbModal);

  userList: Array<IUser> = [];
  // user = {} as IUser;

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    return this.users
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        const usersData = response as { data: IUser[] };
        this.userList = usersData.data || [];
      });
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
