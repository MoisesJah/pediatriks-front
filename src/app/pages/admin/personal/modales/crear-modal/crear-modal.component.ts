import { Component, EventEmitter, inject, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss']
})
export class CrearModalComponent implements AfterViewInit {
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
      sueldo: ['', [Validators.required, Validators.min(0)]],
      id_tipopersonal: ['', Validators.required],
      id_terapia: ['', Validators.required],
      id_horario: ['', Validators.required],
      horario_inicio: ['', Validators.required],
      horario_fin: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    flatpickr(this.horarioInicioInput.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      locale: Spanish
    });

    flatpickr(this.horarioFinInput.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      locale: Spanish
    });
  }

  ngOnInit(): void {
    this.getTipoPersonalList();
    this.getTerapiasList();
    this.getHorariosList();
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.personalForm.valid) {
      console.log(this.personalForm.value);
      this.personalService.create(this.personalForm.value).subscribe(() => {
        this.onSaveComplete.emit();
        this.modal.dismissAll();
      });
    }
  }

  getTipoPersonalList(): void {
    this.tipoPersonalService.getAll().subscribe(data => {
      this.tiposPersonalList = data;
    });
  }

  getTerapiasList(): void {
    this.terapiaService.getAll().subscribe((response) => {
      this.terapiasList = response.data;
    });
  }

  getHorariosList(): void {
    this.horarioPersonalService.getAll().subscribe(data => {
      this.horariosList = data;
    });
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }
}
