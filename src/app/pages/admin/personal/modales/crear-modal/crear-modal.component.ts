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
import { Subject } from 'rxjs';
import { generos } from '../../../pacientes/modals/genero.data';

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
  generos = generos;

  personalForm: FormGroup;
  tiposPersonalList: TipoPersonal[] = [];
  terapiasList: Terapia[] = [];
  horariosList: HorarioPersonal[] = [];

  searchTerm$ = new Subject<string>();

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
      genero: ['', Validators.required],
      sueldo: [0, [Validators.required, Validators.min(0)]],
      id_tipopersonal: ['', Validators.required],
      id_terapia: ['', Validators.required],
      id_horariop: ['', Validators.required],
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
    this.tipoPersonalService.getAll().subscribe({
      next: (response) => {
        this.tiposPersonalList = response.data;
      },
      error: (err) => console.error('Error al cargar tipos de personal:', err),
    });
  }

  getTerapiasList(): void {
    this.terapiaService.getAll().subscribe({
      next: (response: { data: Terapia[] }) => {
        console.log('Terapias:', response.data);
        this.terapiasList = Array.isArray(response.data) ? response.data : [];
        // this.personalForm.patchValue({
        //   id_terapia: this.terapiasList[0]?.id_terapia || '',
        // });
      },
      error: (err) => console.error('Error al cargar terapias:', err),
    });
  }

  getHorariosList(): void {
    this.horarioPersonalService.getAll().subscribe({
      next: (response) => {
        console.log('Respuesta del servicio HorarioPersonal:', response);
        this.horariosList = response.data;
      },
      error: (err) => console.error('Error al cargar horarios:', err),
    });
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }
}
