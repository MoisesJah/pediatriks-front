import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users = inject(UserService);
  isLoading = inject(LoadingService)

  list: Array<IUser> = [];
  user = {} as IUser;

  ngOnInit(): void {
    this.users.getAll().subscribe((response) => {
      const users =  response as { data: IUser[] };
      this.list = users.data  || [];
      console.log(users);
    });
  }
 
  delete(id: number) {
    this.users.delete(id).subscribe(() => {
      this.list = this.list.filter((user) => user.id !== id);
    });
  }

  edit(user: IUser, id: number) {
    this.users.update(user, id).subscribe(() => {
      this.list = this.list.map((u) => (u.id === user.id ? user : u));
    })
  }
}
