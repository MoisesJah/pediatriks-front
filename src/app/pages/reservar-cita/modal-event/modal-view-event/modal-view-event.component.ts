import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'src/app/models/calendar-event';

@Component({
  selector: 'app-modal-view-event',
  templateUrl: './modal-view-event.component.html',
  styleUrl: './modal-view-event.component.scss'
})
export class ModalViewEventComponent {
  event!:CalendarEvent | null;
  modal = inject(NgbActiveModal)

  closeModal() {
    this.modal.close();
  }

  openEditModal() {
    this.modal.close();
  }

  deleteEvent() {
    this.modal.close();
  }
}
