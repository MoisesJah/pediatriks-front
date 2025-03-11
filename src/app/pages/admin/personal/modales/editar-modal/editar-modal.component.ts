import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  inject,
  Output,
  AfterViewInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import { Personal } from 'src/app/models/personal';
import { HorarioPersonal } from 'src/app/models/horariop';
import { Terapia } from 'src/app/models/terapia';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { generateColorPalette } from 'src/app/utils/colorPalette';
import { ToastrService } from 'ngx-toastr';
import { ListItemAnimation } from 'src/app/utils/animations';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss'],
  animations: [ListItemAnimation],
})
export class EditarModalComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  toast = inject(ToastrService);
  personalService = inject(PersonalService);
  tipoPersonalService = inject(TipoPersonalService);
  terapiaService = inject(TerapiaService);
  horarioPersonalService = inject(HorarioPersonalService);
  isLoading = inject(LoadingService).isLoading;
  generosService = inject(GeneroService);
  sedesService = inject(SedesService);

  personalId!: string; // Asegúrate de que el ID sea pasado como Input
  editForm: FormGroup;
  terapiasList: Observable<Terapia[]> = new Observable();
  horariosList: Observable<HorarioPersonal[]> = new Observable();
  generosList: Observable<any> = new Observable();
  sedesList: Observable<any> = new Observable();

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  };

  dias = [
    { value: 1, name: 'Lunes' },
    { value: 2, name: 'Martes' },
    { value: 3, name: 'Miércoles' },
    { value: 4, name: 'Jueves' },
    { value: 5, name: 'Viernes' },
    { value: 6, name: 'Sábado' },
  ];

  colorTerapia: null | string = null;

  loadingGenero: boolean;
  loadingSedes: boolean;
  loadingTerapia: boolean;
  loadingTPersonal: boolean;
  loadingHorario: boolean;
  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.loadingGenero = false;
    this.loadingSedes = false;
    this.loadingTerapia = false;
    this.loadingTPersonal = false;
    this.loadingHorario = false;

    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      id_genero: [null, Validators.required],
      id_sede: [null, Validators.required],
      sueldo: ['', [Validators.required, Validators.min(0)]],
      id_terapia: [null, Validators.required],
      horarios: this.fb.array([]),
      cv: [null],
      nro_colegiatura: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*')],
      ],
      direccion: [''],
      color: [null, Validators.required],
    });
  }

  get horarios(): FormArray {
    return this.editForm.get('horarios') as FormArray;
  }

  createHorario() {
    return this.fb.group({
      id_horario: [null],
      dia_semana: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fin: [null, Validators.required],
    });
  }

  addHorario() {
    this.horarios.push(this.createHorario());
  }

  removeHorario(index: number) {
    this.horarios.removeAt(index);
  }

  evtSelectFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.editForm.get('cv')?.setValue(files?.item(0));
  }

  onChangeTerapia(event: any) {
    this.colorTerapia = event?.color;
    this.editForm.get('color')?.setValue(null);
  }

  get colorPalette() {
    return this.colorTerapia ? generateColorPalette(this.colorTerapia, 15) : [];
  }

  ngOnInit(): void {
    if (this.personalId) {
      this.loadPersonalData();
    }
    this.getTerapiasList();
    this.getGenerosList();
    this.getSedesList();
  }

  ngAfterViewInit(): void {
    this.horarios.valueChanges.subscribe((horarios) => {
      for (let i = 0; i < horarios.length; i++) {
        const horario = horarios[i];
        const horaInicio = horario.hora_inicio;
        const horaFin = horario.hora_fin;
        if (horaInicio > horaFin) {
          const [hours, minutes] = horaInicio.split(':').map(Number);
          const newMinutes = minutes + 60;
          const newHours = hours + Math.floor(newMinutes / 60);
          const remainingMinutes = newMinutes % 60;

          this.horarios
            .at(i)
            .get('hora_fin')
            ?.setValue(
              `${newHours.toString().padStart(2, '0')}:${remainingMinutes
                .toString()
                .padStart(2, '0')}`,
              { emitEvent: false }
            );
        }
      }
    });
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    const formData = new FormData();
    Object.keys(this.editForm.value).forEach((key) => {
      const control = this.editForm.get(key);
      if (Array.isArray(control?.value)) {
        formData.append(key, JSON.stringify(control?.value));
      } else if (control?.value) {
        formData.append(key, control?.value);
      }
    });

    if (this.editForm.valid) {
      this.personalService.update(formData, this.personalId).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.errors) {
            const errors = Object.values(err.error.errors).join('\n');
            this.toast.error(errors, 'Error');
          } else {
            this.toast.error('Ocurrió un error al crear el personal', 'Error');
          }
        },
      });
    }
  }

  private loadPersonalData() {
    if (this.personalId) {
      this.personalService
        .getById(this.personalId)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (personal) => {
            this.editForm.patchValue(personal.data);
            this.colorTerapia = personal.data.terapia?.color;

            if (personal.data.horarios) {
              personal.data.horarios.forEach((horario: any) => {
                this.horarios.push(
                  this.fb.group({
                    id_horario: [horario.id_horario],
                    dia_semana: [horario.dia_semana, Validators.required],
                    hora_inicio: [horario.hora_inicio, Validators.required],
                    hora_fin: [horario.hora_fin, Validators.required],
                  })
                );
              });
            }
          },
          error: (err: HttpErrorResponse) => {
            this.toast.error('Ocurrió un error.', 'Error');
          },
        });
    }
  }

  getGenerosList(): void {
    this.loadingGenero = true;
    this.generosList = this.generosService.getAll().pipe(
      map((response: any) => {
        this.loadingGenero = false;
        return response.data;
      })
    );
  }

  getTerapiasList(): void {
    this.loadingTerapia = true;
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((response: any) => response.data),
      finalize(() => (this.loadingTerapia = false)),
      untilDestroyed(this)
    );
  }

  getSedesList(): void {
    this.loadingSedes = true;
    this.sedesList = this.sedesService.getAll().pipe(
      map((response: any) => response.data),
      finalize(() => (this.loadingSedes = false)),
      untilDestroyed(this)
    );
  }
}
