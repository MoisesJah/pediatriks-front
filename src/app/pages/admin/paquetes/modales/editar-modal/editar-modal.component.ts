import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  inject,
  Output,
  ElementRef,
  AfterViewInit,
  ViewChild,
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
import { Paquete } from 'src/app/models/paquetes';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { map, Observable } from 'rxjs';
import { Terapia } from 'src/app/models/terapia';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgSelectModule } from '@ng-select/ng-select';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FlatpickrModule, NgSelectModule],
})
export class EditarModalComponent implements OnInit {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  terapiaService = inject(TerapiaService);
  isLoading = inject(LoadingService).isLoading;

  @Input() paqueteId: string | { id_paquetes: string } = '';
  paqueteForm: FormGroup;
  terapiasList: Observable<Terapia[]> = new Observable();

  @Output() onSaveComplete = new EventEmitter<void>();
  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('endDatePicker') endDatePicker!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.paqueteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidadsesiones: [0, [Validators.required, Validators.min(0)]],
      precioregular: [0, [Validators.required, Validators.min(0)]],
      descuento: [0, [Validators.required, Validators.min(0)]],
      preciopaquete: [0, [Validators.required, Validators.min(0)]],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      terapias: [null, Validators.required],
      sesionesrestantes: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadTerapias();

    if (typeof this.paqueteId === 'string') {
      this.loadPaqueteData(); // Llama sin argumento
    } else if (
      typeof this.paqueteId === 'object' &&
      this.paqueteId.id_paquetes
    ) {
      // Extrae el ID del objeto y llama con ese ID
      this.loadPaqueteData(this.paqueteId.id_paquetes);
    } else {
      console.error(
        'ID del paquete no proporcionado o no es una cadena',
        this.paqueteId
      );
    }
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

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.paqueteForm.valid) {
      const paqueteData: Paquete = this.paqueteForm.value;

      if (typeof this.paqueteId === 'string') {
        this.paqueteService.update(this.paqueteId, paqueteData).subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.modal.dismissAll();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error al actualizar paquete:', err.message);
          },
        });
      } else if (
        typeof this.paqueteId === 'object' &&
        this.paqueteId.id_paquetes
      ) {
        this.paqueteService
          .update(this.paqueteId.id_paquetes, paqueteData)
          .subscribe({
            next: () => {
              this.onSaveComplete.emit();
              this.modal.dismissAll();
            },
            error: (err: HttpErrorResponse) => {
              console.error('Error al actualizar paquete:', err.message);
            },
          });
      } else {
        console.error(
          'ID del paquete no proporcionado o en formato incorrecto'
        );
      }
    }
  }

  private loadPaqueteData(paqueteId?: string) {
    // Usa el paqueteId de la propiedad de clase si no se pasa como argumento
    const id =
      paqueteId ||
      (typeof this.paqueteId === 'object'
        ? this.paqueteId.id_paquetes
        : this.paqueteId);

    if (id) {
      this.paqueteService.getById(id).subscribe({
        next: (paquete) => {
          this.paqueteForm.patchValue({
            ...paquete.data,
            terapias: paquete.data.terapias.map((terapia) => terapia.id_terapia),
          });
        },
        error: (err) => {
          console.error('Error al cargar datos del paquete:', err);
        },
      });
    } else {
      console.error('ID del paquete no proporcionado');
    }
  }

  private calculatePreciopaquete(): void {
    const precioregular = this.paqueteForm.get('precioregular')?.value;
    const descuento = this.paqueteForm.get('descuento')?.value;

    if (precioregular && descuento != null) {
      const descuentoDecimal = descuento / 100;
      const preciopaquete = precioregular - precioregular * descuentoDecimal;
      this.paqueteForm
        .get('preciopaquete')
        ?.setValue(preciopaquete, { emitEvent: false });
    }
  }
}
