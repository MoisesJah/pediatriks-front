import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-extras-modal',
  templateUrl: './extras-modal.component.html',
  styleUrls: ['./extras-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
})
export class ExtrasModalComponent {
  extrasForm: FormGroup;
  modal = inject(NgbModal);
  loadingService = inject(LoadingService);
  reportesService = inject(ReportesService);
  isLoading = this.loadingService.isLoading;
  metodosPago: string[] = [
    'Efectivo',
    'Yape',
    'BCP',
    'Interbank',
    'BBVA',
    'Transferencia',
  ];
  tipoEgreso: string[] = ['Personal', 'Materiales', 'Mantenimiento', 'Administrativos', 'Implementación', 'Varios'];

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.extrasForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      metodoPago: [null, Validators.required],
      tipoEgreso: [null, Validators.required],
    });
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.extrasForm.valid) {
      this.reportesService.addReporte(this.extrasForm.value).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
