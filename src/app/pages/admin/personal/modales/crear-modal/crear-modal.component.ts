import { Component, EventEmitter, inject, Output, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { TipoPersonal } from 'src/app/models/tipopersonal';
import { HorarioPersonal } from 'src/app/models/horariop';
import { Terapia } from 'src/app/models/terapia';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss']
})
export class CrearModalComponent implements AfterViewInit, OnInit {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  tipoPersonalService = inject(TipoPersonalService);
  terapiaService = inject(TerapiaService);
  horarioPersonalService = inject(HorarioPersonalService);
  isLoading = inject(LoadingService).isLoading;

  personalForm: FormGroup;
  tiposPersonalList: TipoPersonal[] = [];
  terapiasList: Terapia[] = [];
  horariosList: HorarioPersonal[] = [];

  searchTerm$ = new Subject<string>(); // Subject para la búsqueda

  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('horarioInicio') horarioInicioInput!: ElementRef;
  @ViewChild('horarioFin') horarioFinInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      sueldo: [0, [Validators.required, Validators.min(0)]],
      id_tipopersonal: ['', Validators.required],
      id_terapia: ['', Validators.required],
      id_horario: ['', Validators.required],
      horario_inicio: ['', Validators.required],
      horario_fin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTipoPersonalList();
    this.getTerapiasList();
    this.getHorariosList();
  }

  ngAfterViewInit(): void {
    if (this.horarioInicioInput?.nativeElement) {
      flatpickr(this.horarioInicioInput.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        locale: Spanish
      });
    }

    if (this.horarioFinInput?.nativeElement) {
      flatpickr(this.horarioFinInput.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        locale: Spanish
      });
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.personalForm.valid) {
      this.personalService.create(this.personalForm.value).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al guardar personal:', err);
        }
      });
    }
  }

  getTipoPersonalList(): void {
    this.tipoPersonalService.getAll().subscribe(data => {
      this.tiposPersonalList = Array.isArray(data) ? data : [];
    });
  }

  getTerapiasList(): void {
    this.terapiaService.getAll().subscribe(response => {
      this.terapiasList = Array.isArray(response.data) ? response.data : [];
    });
  }

  getHorariosList(): void {
    this.horarioPersonalService.getAll().subscribe(data => {
      this.horariosList = Array.isArray(data) ? data : [];
    });
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }
}
