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
import Spanish from 'flatpickr/dist/l10n/es.js';

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
  es = Spanish.es;
  terapiasList: Observable<Terapia[]> = new Observable();

  @Output() onSaveComplete = new EventEmitter<void>();
  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('endDatePicker') endDatePicker!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.paqueteForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      num_cambios: [null, [Validators.required, Validators.min(1)]],
      cantidadsesiones: [0, [Validators.required, Validators.min(1)]],
      precioregular: [0, [Validators.required, Validators.min(0)]],
      descuento: [0, [Validators.required, Validators.min(0)]],
      preciopaquete: [0, [Validators.required, Validators.min(0)]],
      fechainicio: [''],
      fechafin: [''],
      terapias: [null, Validators.required],
      sesionesrestantes: [0, [Validators.required, Validators.min(0)]],
      banner_url: [''],
    });
  }

  ngOnInit(): void {
    this.loadTerapias();

    if (typeof this.paqueteId === 'string') {
      this.loadPaqueteData();
    } else if (
      typeof this.paqueteId === 'object' &&
      this.paqueteId.id_paquetes
    ) {

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
      const formData = new FormData();
      formData.append('nombre', this.paqueteForm.get('nombre')?.value || '');
      formData.append('descripcion', this.paqueteForm.get('descripcion')?.value || '');
      formData.append('cantidadsesiones', this.paqueteForm.get('cantidadsesiones')?.value || '');
      formData.append('num_cambios', this.paqueteForm.get('num_cambios')?.value || '');
      formData.append('precioregular', this.paqueteForm.get('precioregular')?.value || '');
      formData.append('descuento', this.paqueteForm.get('descuento')?.value || '');
      formData.append('preciopaquete', this.paqueteForm.get('preciopaquete')?.value || '');
      formData.append('fechainicio', this.paqueteForm.get('fechainicio')?.value || '');
      formData.append('fechafin', this.paqueteForm.get('fechafin')?.value || '');
      formData.append('terapias', JSON.stringify(this.paqueteForm.get('terapias')?.value) || '[]');
      formData.append('sesionesrestantes', this.paqueteForm.get('sesionesrestantes')?.value || '');

      const bannerUrlFile = this.paqueteForm.get('banner_url')?.value;
      if (bannerUrlFile) {
        formData.append('banner_url', bannerUrlFile);
      }

      const id = typeof this.paqueteId === 'string' ? this.paqueteId : this.paqueteId.id_paquetes;

      if (id) {
        this.paqueteService.update(id, formData).subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.modal.dismissAll();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error al actualizar paquete:', err.message);
            alert('No se pudo actualizar el paquete. Intenta nuevamente.');
          },
        });
      }
    }
  }

  private loadPaqueteData(paqueteId?: string) {
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

  evtSelectFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.paqueteForm.get('banner_url')?.setValue(file);
    }
  }

}
