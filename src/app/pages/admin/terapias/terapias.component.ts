import { CommonModule, formatCurrency } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { Terapia } from 'src/app/models/terapia';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-terapias',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './terapias.component.html',
  styleUrl: './terapias.component.scss'
})
export class TerapiasComponent implements OnInit, OnDestroy {
  modal = inject(NgbModal)
  terapias = inject(TerapiaService)

  terapiasList: Terapia[] = [];

  ngOnInit(): void {
    this.fetchTerapias();
  }
  ngOnDestroy(): void {

  }

  fetchTerapias() {
  this.terapias.getAll()
    .pipe(untilDestroyed(this))
    .subscribe((response) => {
      const terapiasData = response as { data: Terapia[] };
      this.terapiasList = terapiasData.data || [];
    });
}


  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }

  openEditModal(terapia: Terapia) {
    const modalRef = this.modal.open(EditModalComponent, {
      size: '300px',
      animation: true,
      centered: true
    });

    modalRef.componentInstance.terapiaForm.patchValue(terapia);
    modalRef.componentInstance.terapiaId = terapia.id_terapia;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }

  openDeleteModal(terapia: Terapia) {
    const modalRef = this.modal.open(DeleteModalComponent, {
      size: '300px',
      animation: true,
      centered: true
    });
    modalRef.componentInstance.terapiaId = terapia.id_terapia;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }
}
