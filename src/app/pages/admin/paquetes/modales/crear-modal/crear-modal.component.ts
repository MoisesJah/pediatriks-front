import { CommonModule } from '@angular/common';
import { Component, inject, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Asegúrate de importar CommonModule aquí
})
export class CrearModalComponent implements AfterViewInit {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  loadingService = inject(LoadingService);
  paqueteForm: FormGroup;
  isLoading = this.loadingService.isLoading; // Usa el observable de carga
  @Input() terapiaid: string = '';

  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('endDatePicker') endDatePicker!: ElementRef;

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

  ngOnInit(): void {
    // Suscribirse a los cambios en precioregular y descuento
    this.paqueteForm.get('precioregular')?.valueChanges.subscribe(() => this.calculatePreciopaquete());
    this.paqueteForm.get('descuento')?.valueChanges.subscribe(() => this.calculatePreciopaquete());
  }

  ngAfterViewInit(): void {
    const today = new Date(); // La fecha de hoy

    if (this.datePicker && this.datePicker.nativeElement) {
      flatpickr(this.datePicker.nativeElement, {
        locale: Spanish,
        dateFormat: "Y-m-d",
        minDate: today, // Solo permite fechas actuales o futuras
        onChange: (selectedDates) => {
          const startDate = selectedDates[0];
          if (this.endDatePicker && this.endDatePicker.nativeElement) {
            const endPickerInstance = flatpickr(this.endDatePicker.nativeElement, {
              locale: Spanish,
              dateFormat: "Y-m-d",
              minDate: startDate, // Establece la fecha mínima para la fecha de fin
            });
            if (this.paqueteForm.get('fechafin')?.value < startDate) {
              this.paqueteForm.get('fechafin')?.setValue(startDate);
              endPickerInstance.setDate(startDate);
            }
          }
        }
      });
    }

    if (this.endDatePicker && this.endDatePicker.nativeElement) {
      flatpickr(this.endDatePicker.nativeElement, {
        locale: Spanish,
        dateFormat: "Y-m-d",
        minDate: today, // Inicialmente permite fechas actuales o futuras
      });
    }
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

  private calculatePreciopaquete(): void {
    const precioregular = this.paqueteForm.get('precioregular')?.value;
    const descuento = this.paqueteForm.get('descuento')?.value;

    if (precioregular && descuento != null) {
      const descuentoDecimal = descuento / 100;
      const preciopaquete = precioregular - (precioregular * descuentoDecimal);
      this.paqueteForm.get('preciopaquete')?.setValue(preciopaquete, { emitEvent: false });
    }
  }
}
