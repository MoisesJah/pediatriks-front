import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-borrar-modal',
  templateUrl: './borrar-modal.component.html',
  styleUrls: ['./borrar-modal.component.scss']
})
export class BorrarModalComponent {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  isLoading = inject(LoadingService).isLoading;

  @Output() onSaveComplete = new EventEmitter();

  personalId: number | undefined;

  close() {
    this.modal.dismissAll();
  }

  delete() {
    if (this.personalId !== undefined) {
      this.personalService.delete(this.personalId).subscribe(() => {
        this.onSaveComplete.emit();
        this.modal.dismissAll();
      });
    }
  }
}

