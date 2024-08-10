import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent implements OnInit {
  modal = inject(NgbModal)
  pacienteService = inject(PacienteService)
  isLoading = inject(LoadingService).isLoading

  pacientesList: IPaciente[] = [];

  ngOnInit(): void {
    this.fetchPacientes();
  }

  private fetchPacientes() {
    return this.pacienteService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((pacientes) => {
        const response = pacientes as { data: IPaciente[] };
        this.pacientesList = response.data || [];
      });
  }

  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPacientes();
    });
  }

  close() {
    this.modal.dismissAll();
  }
}
