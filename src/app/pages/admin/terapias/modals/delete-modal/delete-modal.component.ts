import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITerapia } from 'src/app/models/terapia';
import { LoadingService } from 'src/app/services/loading.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  modal = inject(NgbActiveModal)
  terapiaService = inject(TerapiaService)
  isLoading = inject(LoadingService).isLoading

  @Output() onSaveComplete = new EventEmitter()

  terapiaId: string | undefined

  delete() {
    this.terapiaService
      .delete(this.terapiaId!)
      .subscribe(() => {
        this.onSaveComplete.emit();
        this.modal.close();
      })
  }

  close() {
    this.modal.close();
  }
}
