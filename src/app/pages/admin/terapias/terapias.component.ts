import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';

@Component({
  selector: 'app-terapias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terapias.component.html',
  styleUrl: './terapias.component.scss'
})
export class TerapiasComponent {
  modal = inject(NgbModal)

  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true
    });
  }
}
