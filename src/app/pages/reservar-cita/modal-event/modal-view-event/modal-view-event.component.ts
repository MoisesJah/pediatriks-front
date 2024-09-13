import { Component, inject, OnInit } from '@angular/core';
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

  event: Cita | null = null;

  constructor() {}

  ngOnInit(): void {
    this.citaService.getById(this.citaId, this.eventId).subscribe((resp) => {
      this.event = resp.data;
      console.log(this.event);
      console.log(this.citaId, this.eventId);
    });
  }

  sessionInfo() {
    const tipocita = this.event?.tipo_cita;
    const sesion = this.event?.sesion.num_sesion!;

    if (tipocita === 'Evaluación' && sesion <= 1) {
      return `Evaluación`;
    }
    return `Sesión ${sesion}`;
  }

  closeModal() {
    this.activeModal.close();
  }

  openEditModal() {
    this.modal.open(ModalEditComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'modal-edit',
    });
  }

  deleteEvent() {
    
  }
}
