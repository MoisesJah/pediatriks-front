import { CommonModule } from '@angular/common';
import { Component, inject, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Asegúrate de importar CommonModule aquí
})
export class CrearModalComponent {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  loadingService = inject(LoadingService);
  paqueteForm: FormGroup;
  isLoading = this.loadingService.isLoading; // Usa el observable de carga
  @Input() terapiaid: string = '';

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.paqueteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidadsesiones: ['', [Validators.required, Validators.min(1)]],
      precioregular: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      descuento: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      preciopaquete: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      sesionesrestantes: ['', [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.paqueteForm.valid) {
      this.loadingService.setLoading(true, 'paquete/create'); // Asigna una URL única
      this.paqueteService.create(this.paqueteForm.value).subscribe({
        next: (response) => {
          console.log('Paquete creado con éxito:', response);
          this.loadingService.setLoading(false, 'paquete/create'); // Elimina la URL única
          this.onSaveComplete.emit(); // Emite evento cuando se guarda el paquete
          this.close();
        },
        error: (error) => {
          console.error('Error al crear paquete:', error);
          this.loadingService.setLoading(false, 'paquete/create'); // Elimina la URL única
        }
      });
    }
  }
}
