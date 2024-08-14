import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  modal = inject(NgbModal)
  users = inject(UserService);
  isLoading = inject(LoadingService).isLoading

  @Output() onSaveComplete = new EventEmitter()
  
  userId: number | undefined
  
  close() {
    this.modal.dismissAll()
  }

  delete() {
    this.users.delete(this.userId!).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.dismissAll();
    });
  }

}
