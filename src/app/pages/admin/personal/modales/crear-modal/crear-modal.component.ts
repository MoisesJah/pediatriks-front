import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { finalize, map, Observable, Subject } from 'rxjs';
import { HorarioPersonal } from 'src/app/models/horariop';
import { Terapia } from 'src/app/models/terapia';
import { TipoPersonal } from 'src/app/models/tipopersonal';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { generateColorPalette } from 'src/app/utils/colorPalette';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
})
export class CrearModalComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;
  personalService = inject(PersonalService);
  tipoPersonalService = inject(TipoPersonalService);
  terapiaService = inject(TerapiaService);
  horarioPersonalService = inject(HorarioPersonalService);
  generosService = inject(GeneroService);
  sedesService = inject(SedesService);

  personalForm: FormGroup;
  tiposPersonalList: Observable<TipoPersonal[]> = new Observable();
  terapiasList: Observable<Terapia[]> = new Observable();
  horariosList: Observable<HorarioPersonal[]> = new Observable();
  generosList: Observable<any> = new Observable();
  sedesList: Observable<any> = new Observable();

  archivo: File | null = null;

  loadingGenero: boolean;
  loadingSedes: boolean;
  loadingTerapia: boolean;
  loadingTPersonal: boolean;
  loadingHorario: boolean;
  colorTerapia: null | string = null;

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

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.loadingGenero = false;
    this.loadingSedes = false;
    this.loadingTerapia = false;
    this.loadingTPersonal = false;
    this.loadingHorario = false;

    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[0-9]*'),
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      id_genero: [null, Validators.required],
      id_sede: [null, Validators.required],
      sueldo: [0, [Validators.required, Validators.min(0)]],
      id_terapia: [null, Validators.required],
      cv: [null],
      color: [null, Validators.required],
      horarios: this.fb.array([this.createHorario()]),
    });
  }

  get horarios(): FormArray {
    return this.personalForm.get('horarios') as FormArray;
  }

  createHorario() {
    return this.fb.group({
      dia_semana: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fin: [null, Validators.required],
    });
  }

  onChangeTerapia(event: any) {
    this.colorTerapia = event?.color;
    this.personalForm.get('color')?.setValue(null);
  }

  get colorPalette() {
    return this.colorTerapia ? generateColorPalette(this.colorTerapia,10) : [];
  }

  addHorario() {
    this.horarios.push(this.createHorario());
  }

  removeHorario(index: number) {
    this.horarios.removeAt(index);
  }

  ngOnInit(): void {
    this.getTerapiasList();
    this.getGenerosList();
    this.getSedesList();
  }

  ngAfterViewInit(): void {
    this.horarios.valueChanges.subscribe((horarios) => {
      for (let i = 0; i < horarios.length; i++) {
        const horario = horarios[i];
        if (horario.hora_fin < horario.hora_inicio) {
          horario.hora_fin = horario.hora_inicio;
          this.horarios.at(i).get('hora_fin')?.setValue(horario.hora_fin);
        }
      }
    });
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.personalForm.valid) {
      this.personalService
        .create({
          ...this.personalForm.value,
          horarios: this.horarios.value,
        })
        .subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.modal.dismissAll();
          },
          error: (err) => {
            console.error('Error al guardar personal:', err);
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

  getSedesList(): void {
    this.loadingSedes = true;
    this.sedesList = this.sedesService.getAll().pipe(
      map((response: any) => {
        this.loadingSedes = false;
        return response.data;
      })
    );
  }

  getTerapiasList(): void {
    this.loadingTerapia = true;
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((response: any) => response.data),
      finalize(() => (this.loadingTerapia = false))
    );
  }

  getHorariosList(): void {
    this.loadingHorario = true;
    this.horariosList = this.horarioPersonalService.getAll().pipe(
      map((response: any) => {
        this.loadingHorario = false;
        return response.data;
      })
    );
  }

  evtSelectFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    const file: File | null = files ? files[0] : null;
    this.archivo = file;
    this.personalForm.patchValue({
      cv: this.archivo,
    });

    // console.log(this.personalForm.value);
  }
}
