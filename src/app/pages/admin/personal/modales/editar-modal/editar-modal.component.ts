import { Component, EventEmitter, Input, OnInit, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Input() personalId!: number; // Asegúrate de que el ID sea pasado como Input
  editForm: FormGroup;
  tiposPersonalList: TipoPersonal[] = [];
  terapiasList: Terapia[] = [];
  horariosList: HorarioPersonal[] = [];

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
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

  ngOnInit(): void {
    if (this.personalId) {
      this.loadPersonalData();
    }
    this.getTipoPersonalList();
    this.getTerapiasList();
    this.getHorariosList();
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
        next: (personal: Personal) => {
          this.editForm.patchValue(personal);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al cargar datos del personal:', err.message);
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
}
