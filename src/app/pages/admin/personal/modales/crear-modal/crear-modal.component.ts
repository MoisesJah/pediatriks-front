import {
  Component,
  EventEmitter,
  inject,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import { TipoPersonal } from 'src/app/models/tipopersonal';
import { HorarioPersonal } from 'src/app/models/horariop';
import { Terapia } from 'src/app/models/terapia';
import { map, Observable, Subject } from 'rxjs';
import { generos } from '../../../pacientes/modals/genero.data';
import { GeneroService } from 'src/app/services/genero/genero.service';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
})
export class CrearModalComponent implements OnInit {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  tipoPersonalService = inject(TipoPersonalService);
  terapiaService = inject(TerapiaService);
  horarioPersonalService = inject(HorarioPersonalService);
  isLoading = inject(LoadingService).isLoading;
  generosService = inject(GeneroService);

  personalForm: FormGroup;
  tiposPersonalList: Observable<TipoPersonal[]> = new Observable();
  terapiasList: Observable<Terapia[]> = new Observable();
  horariosList: Observable<HorarioPersonal[]> = new Observable();
  generosList: Observable<any> = new Observable();


  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: [
        '',
        [Validators.required, Validators.minLength(8),Validators.pattern('^[0-9]*'), ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      id_genero: [null, Validators.required],
      sueldo: [0, [Validators.required, Validators.min(0)]],
      id_tipopersonal: [null, Validators.required],
      id_terapia: [null, Validators.required],
      id_horariop: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTipoPersonalList();
    this.getTerapiasList();
    this.getHorariosList();
    this.getGenerosList();
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
        },
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

  getHorariosList(): void {
    this.horariosList = this.horarioPersonalService.getAll().pipe(
      map((response) => response.data),
    )
  }
}
