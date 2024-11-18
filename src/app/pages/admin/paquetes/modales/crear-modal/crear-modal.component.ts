import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { map, Observable } from 'rxjs';
import { Terapia } from 'src/app/models/terapia';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgSelectModule } from '@ng-select/ng-select';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule], // Asegúrate de importar CommonModule aquí
})
export class CrearModalComponent implements AfterViewInit {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  loadingService = inject(LoadingService);
  terapiaService = inject(TerapiaService);
  paqueteForm: FormGroup;
  isLoading = this.loadingService.isLoading; // Usa el observable de carga
  @Input() terapiaid: string = '';

  terapiasList: Observable<Terapia[]> = new Observable();

  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('endDatePicker') endDatePicker!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.paqueteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      num_cambios: [null, [Validators.required, Validators.min(1)]],
      cantidadsesiones: ['', [Validators.required, Validators.min(1)]],
      precioregular: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        ],
      ],
      descuento: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        ],
      ],
      preciopaquete: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        ],
      ],
      fechainicio: [''],
      fechafin: [''],
      terapias: [null, Validators.required],
      banner_url: [''],
    });
  }

  evtSelectFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.paqueteForm.get('banner_url')?.setValue(files?.item(0));
  }

  ngOnInit(): void {
    this.loadTerapias();
    // Suscribirse a los cambios en precioregular y descuento
    this.paqueteForm
      .get('precioregular')
      ?.valueChanges.subscribe(() => this.calculatePreciopaquete());
    this.paqueteForm
      .get('descuento')
      ?.valueChanges.subscribe(() => this.calculatePreciopaquete());

    this.paqueteForm.get('fechainicio')?.valueChanges.subscribe(() => {
      if (
        this.paqueteForm.get('fechafin')?.value <
        this.paqueteForm.get('fechainicio')?.value
      ) {
        this.paqueteForm
          .get('fechafin')
          ?.setValue(this.paqueteForm.get('fechainicio')?.value);
      }
    });
  }

  loadTerapias(): void {
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  ngAfterViewInit(): void {
    const today = new Date(); // La fecha de hoy

    if (this.datePicker && this.datePicker.nativeElement) {
      flatpickr(this.datePicker.nativeElement, {
        locale: Spanish,
        altFormat: 'd/m/Y',
        altInput: true,
        minDate: today, // Solo permite fechas actuales o futuras
        onChange: (selectedDates) => {
          const startDate = selectedDates[0];
          if (this.endDatePicker && this.endDatePicker.nativeElement) {
            const endPickerInstance = flatpickr(
              this.endDatePicker.nativeElement,
              {
                locale: Spanish,
                altFormat: 'd/m/Y',
                altInput: true,
                minDate: startDate, // Establece la fecha mínima para la fecha de fin
              }
            );
            if (this.paqueteForm.get('fechafin')?.value < startDate) {
              this.paqueteForm.get('fechafin')?.setValue(startDate);
              endPickerInstance.setDate(startDate);
            }
          }
        },
      });
    }

    if (this.endDatePicker && this.endDatePicker.nativeElement) {
      flatpickr(this.endDatePicker.nativeElement, {
        locale: Spanish,
        altInput: true,
        altFormat: 'd/m/Y',
        // dateFormat: "d/m/Y",
        minDate: today,
      });
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    const formData = new FormData();
    Object.keys(this.paqueteForm.value).forEach((key) => {
      const control = this.paqueteForm.get(key);
      if (Array.isArray(control?.value)) {
        formData.append(key, JSON.stringify(control?.value));
      } else {
        formData.append(key, control?.value);
      }
    });

    this.paqueteService.create(formData).subscribe({
      next: () => {
        this.modal.dismissAll();
        this.onSaveComplete.emit();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private calculatePreciopaquete(): void {
    const precioregular = this.paqueteForm.get('precioregular')?.value;
    const descuento = this.paqueteForm.get('descuento')?.value;

    if (precioregular && descuento != null) {
      const descuentoDecimal = descuento / 100;
      const preciopaquete = precioregular - precioregular * descuentoDecimal;
      this.paqueteForm
        .get('preciopaquete')
        ?.setValue(preciopaquete.toFixed(2), { emitEvent: false });
    }
  }
}
