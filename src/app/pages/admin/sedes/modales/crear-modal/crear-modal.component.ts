import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CrearModalComponent implements AfterViewInit {
  modal = inject(NgbModal);
  sedeService = inject(SedesService);
  loadingService = inject(LoadingService);
  sedeForm: FormGroup;
  isLoading = this.loadingService.isLoading;

  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('startTimePicker') startTimePicker!: ElementRef;
  @ViewChild('endTimePicker') endTimePicker!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.sedeForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      departamento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      horarioapertura: ['', Validators.required],
      horariocierre: ['', Validators.required],
      capacidadpacientes: ['', [Validators.required, Validators.min(1)]],
      numeroconsultorios: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngAfterViewInit() {
    if (this.startTimePicker && this.startTimePicker.nativeElement) {
      flatpickr(this.startTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i"
      });
    }
    if (this.endTimePicker && this.endTimePicker.nativeElement) {
      flatpickr(this.endTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
      });
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.sedeForm.valid) {
      this.loadingService.setLoading(true, 'sede/create');
      this.sedeService.create(this.sedeForm.value).subscribe({
        next: (response: any) => { // Especifica el tipo de `response` si es posible
          console.log('Sede creada con éxito:', response);
          this.loadingService.setLoading(false, 'sede/create');
          this.onSaveComplete.emit();
          this.close();
        },
        error: (error: any) => { // Especifica el tipo de `error` si es posible
          console.error('Error al crear sede:', error);
          this.loadingService.setLoading(false, 'sede/create');
        }
      });
    }
  }

  /**
   * Called when the start time input changes.
   * Sets the minimum end time to 1 minute after the start time.
   */
  onStartTimeChange(event: any): void {
    const [hours, minutes] = event.target.value.split(':').map(Number);
    const minEndDate = new Date();
    // Set the minimum end time to 1 minute after the start time
    minEndDate.setHours(hours, minutes + 1);

    // Update the end time input with the new minimum date
    this.endTimePicker.nativeElement._flatpickr.set('minDate', minEndDate);
  }
}
