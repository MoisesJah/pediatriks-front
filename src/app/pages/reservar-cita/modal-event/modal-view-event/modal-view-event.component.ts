import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { BorrarModalComponent } from '../../cronograma/modals/borrar-modal/borrar-modal.component';
import { Router } from '@angular/router';
import { EditCitaComponent } from 'src/app/pages/terapista/modals/edit-cita/edit-cita.component';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';

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
  router = inject(Router);
  isAdmin = inject(AuthService).isAdmin();
  isLoading = inject(LoadingService).isLoading;

  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  event: Cita | null = null;
  horarios: any[] = [];

  fecha_repro = this.event?.sesion?.fecha_repro && formatDate(this.event?.sesion?.fecha_repro!, 'dd/MM/yyyy', 'en-US');

  constructor() {}

  ngOnInit(): void {
    this.loadEvent();
  }

  sessionInfo() {
    const tipocita = this.event?.tipo_cita.nombre;
    const sesion = this.event?.sesion.num_sesion!;

    if (tipocita === 'Evaluación') {
      return `Evaluación`;
    }
    if(!this.event?.tipo_cita.recurrente) {
      return 'Sesión'
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
    this.citaService
      .getById(this.citaId, this.eventId)
      .pipe(untilDestroyed(this))
      .subscribe((resp) => {
        this.event = resp.data;
      });
  }

  openEditModal() {
    // const modal = this.router.url.includes('/admin') ? ModalEditComponent : EditCitaComponent;
    const modalRef = this.modal.open(ModalEditComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'modal-edit',
    });

    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.horarios = this.horarios;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
      this.loadEvent();
      this.eventUpdated.emit();
    });
  }

  deleteEvent() {
    const modalRef = this.modal.open(BorrarModalComponent, {
      size: 'sm',
      centered: true,
      windowClass: 'modal-edit',
    });

    modalRef.componentInstance.event = this.event;
    modalRef.componentInstance.eventDeleted.subscribe(() => {
      this.modal.dismissAll();
      this.eventUpdated.emit();
    });
  }
}
