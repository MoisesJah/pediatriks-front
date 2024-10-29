import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportesService } from 'src/app/services/reportes/reportes.service';

@Component({
  selector: 'app-extras-modal',
  templateUrl: './extras-modal.component.html',
  styleUrls: ['./extras-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ExtrasModalComponent {
  extrasForm: FormGroup;
  modal = inject(NgbModal);
  loadingService = inject(LoadingService);
  reportesService = inject(ReportesService);
  isLoading = this.loadingService.isLoading;
  metodosPago: string[] = ['Efectivo', 'Yape', 'BCP', 'Interbank', 'BBVA', 'Transferencia'];

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {

    this.extrasForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      metodoPago: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.extrasForm.valid) {
      const extrasData = this.extrasForm.value;
      console.log('Datos de Egreso Extra:', extrasData);
      this.save();
    } else {
      console.log('Formulario inválido');
    }
  }

  private resetForm() {
    this.extrasForm.reset();
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    const reportData = {
        nombre: this.extrasForm.get('nombre')?.value,
        descripcion: this.extrasForm.get('descripcion')?.value,
        costo: this.extrasForm.get('costo')?.value,
        metodoPago: this.extrasForm.get('metodoPago')?.value, 
    };

    console.log('Datos a enviar:', reportData);

    this.reportesService.addReporte(reportData).subscribe({
        next: () => {
            console.log('Reporte guardado con éxito');
            this.modal.dismissAll();
            this.onSaveComplete.emit();
            this.resetForm();
        },
        error: (err: any) => {
            console.log('Error al guardar el reporte:', err);
        },
    });
}

}
