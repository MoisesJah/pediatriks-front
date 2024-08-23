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
import { map, Observable } from 'rxjs';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';

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
  tiposPersonalList: Observable<TipoPersonal[]> = new Observable();
  terapiasList: Observable<Terapia[]> = new Observable();
  horariosList: Observable<HorarioPersonal[]> = new Observable();
  generosList: Observable<any> = new Observable();
  sedesList: Observable<any> = new Observable();

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      id_genero: [null, Validators.required],
      id_sede: [null, Validators.required],
      sueldo: ['', [Validators.required, Validators.min(0)]],
      id_tipopersonal: [null, Validators.required],
      id_terapia: [null, Validators.required],
      id_horariop: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.personalId) {
      this.loadPersonalData();
    }
    this.getTipoPersonalList();
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
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al cargar datos del personal:', err.message);
        }
      });
    }
  }

  getTipoPersonalList(): void {
    this.tiposPersonalList = this.tipoPersonalService.getAll().pipe(
      map((response) => response.data),
    );
  }

  getGenerosList(): void {
    this.generosList = this.generosService.getAll().pipe(
      map((response: any) => response.data),
    );
  }

  getTerapiasList(): void {
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((response) => response.data),
    )
  }

  getSedesList(): void {
    this.sedesList = this.sedesService.getAll().pipe(
      map((response) => response.data),
    );
  }

  getHorariosList(): void {
    this.horariosList = this.horarioPersonalService.getAll().pipe(
      map((response) => response.data),
    )
  }
}
