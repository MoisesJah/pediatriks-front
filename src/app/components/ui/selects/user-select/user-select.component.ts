import { AsyncPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { map, Observable, shareReplay } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  standalone: true,
  imports: [Select2Module, AsyncPipe],
  styleUrl: './user-select.component.scss',
})
export class UserSelectComponent implements OnInit {
  userService = inject(UserService);

  @Output() onSelect = new EventEmitter<any>();

  @Input() placeholder: string = 'Seleccionar';
  @Input() showSearch: 'default' | 'hidden' | 'always' = 'default';

  userList: Observable<Select2Data> = new Observable<Select2Data>();

  ngOnInit(): void {
    this.userList = this.userService.getAll().pipe(
      untilDestroyed(this),
      map((response) => {
        const usersData = response as { data: IUser[] };
        return usersData.data.map((user) => {
          return {
            label: user.name,
            value: user.id,
            data: user,
          };
        });
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );
  }
}
