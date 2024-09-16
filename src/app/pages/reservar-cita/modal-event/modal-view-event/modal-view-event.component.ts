import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-view-event',
  templateUrl: './modal-view-event.component.html',
  styleUrl: './modal-view-event.component.scss',
})
export class ModalViewEventComponent implements OnInit {
  eventId!: string;
  citaId!: string;
  activeModal = inject(NgbActiveModal);
  modal = inject(NgbModal);
  citaService = inject(CitaService);
  isLoading = inject(LoadingService).isLoading;

  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  event: Cita | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadEvent();
  }

  sessionInfo() {
    const tipocita = this.event?.tipo_cita;
    const sesion = this.event?.sesion.num_sesion!;

    if (tipocita === 'Evaluación' && sesion <= 1) {
      return `Evaluación`;
    }
    return `# Sesión ${sesion}`;
  }

  sessionStatus(status: string) {
    switch (status) {
      case 'Programado':
        return 'h-10px w-10px rounded-circle bg-primary';
      case 'Asistió':
        return 'h-10px w-10px rounded-circle bg-success';
      case 'No Asistió':
        return 'h-10px w-10px rounded-circle bg-danger';
      default:
        return '';
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  loadEvent() {
    this.citaService.getById(this.citaId, this.eventId).subscribe((resp) => {
      this.event = resp.data;
    });
  }

  openEditModal() {
    const modalRef = this.modal.open(ModalEditComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'modal-edit',
    });

    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
      this.loadEvent();
      this.eventUpdated.emit()
    });
  }

  deleteEvent() {
    
  }
}
