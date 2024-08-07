import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users = inject(UserService);
  isLoading = inject(LoadingService);
  modal = inject(NgbModal);

  userList: Array<IUser> = [];
  user = {} as IUser;

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.users.getAll().subscribe((response) => {
      const usersData = response as { data: IUser[] };
      this.userList = usersData.data || [];
    });
  }

  /**
   * Opens the create modal and subscribes to the onSaveComplete event to refresh the user list.
   */
  openCreateModal() {
    const modalRef = this.modal.open(
      CreateModalComponent,
      { size: '300px', animation: true }
    );

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchUsers();
    });
  }


  delete(id: number) {
    this.users.delete(id).subscribe(() => {
      this.userList = this.userList.filter((user) => user.id !== id);
    });
  }

  edit(user: IUser, id: number) {
    this.users.update(user, id).subscribe(() => {
      this.userList = this.userList.map((u) => (u.id === user.id ? user : u));
    });
  }
}
