import { Component, EventEmitter, Input, OnInit, inject, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import { Personal } from 'src/app/models/personal';
import { TipoPersonal } from 'src/app/models/tipopersonal';
import { HorarioPersonal } from 'src/app/models/horariop';
import { Terapia } from 'src/app/models/terapia';
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss']
})
export class EditarModalComponent implements OnInit {
  modal = inject(NgbModal);
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
  }

  dias = [
    { value: 1, name: 'Lunes' },
    { value: 2, name: 'Martes' },
    { value: 3, name: 'Miércoles' },
    { value: 4, name: 'Jueves' },
    { value: 5, name: 'Viernes' },
    { value: 6, name: 'Sábado' },
  ];

  loadingGenero : boolean;
  loadingSedes : boolean;
  loadingTerapia : boolean;
  loadingTPersonal : boolean;
  loadingHorario : boolean;
  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {
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
    }) 
  }

  addHorario() {
    this.horarios.push(this.createHorario());
  }

  removeHorario(index: number) {
    this.horarios.removeAt(index);
  }

  ngOnInit(): void {
    if (this.personalId) {
      this.loadPersonalData();
    }
    this.getTerapiasList();
    this.getHorariosList();
    this.getGenerosList();
    this.getSedesList();
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.editForm.valid) {
      this.personalService.update(this.editForm.value, this.personalId).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al actualizar personal:', err.message);
        }
      });
    }
  }

  private loadPersonalData() {
    if (this.personalId) {
      this.personalService.getById(this.personalId).subscribe({
        next: (personal) => {
          this.editForm.patchValue(personal.data);

          if (personal.data.horarios) {
            personal.data.horarios.forEach((horario: any) => {
              this.horarios.push(this.fb.group({
                id_horario: [horario.id_horario],
                dia_semana: [horario.dia_semana, Validators.required],
                hora_inicio: [horario.hora_inicio, Validators.required],
                hora_fin: [horario.hora_fin, Validators.required],
              }));
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al cargar datos del personal:', err.message);
        }
      });
    }
  }


  getGenerosList(): void {
    this.loadingGenero = true;
    this.generosList = this.generosService.getAll().pipe(
      map((response: any) =>{
        this.loadingGenero = false;
        return response.data;
      }),
    );
  }

  getTerapiasList(): void {
    this.loadingTerapia = true;
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((response: any) =>{
        this.loadingTerapia = false;
        return response.data;
      }),
    )
  }

  getSedesList(): void {
    this.loadingSedes = true;
    this.sedesList = this.sedesService.getAll().pipe(
      map((response: any) =>{
        this.loadingSedes = false;
        return response.data;
      }),
    );
  }

  getHorariosList(): void {
    this.loadingHorario = true;
    this.horariosList = this.horarioPersonalService.getAll().pipe(
      map((response: any) =>{
        this.loadingHorario = false;
        return response.data;
      }),
    )
  }
}
