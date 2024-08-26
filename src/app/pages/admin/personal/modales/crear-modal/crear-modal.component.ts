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
import { SedesService } from 'src/app/services/sedes/sedes.service';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
})
export class CrearModalComponent implements OnInit {
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

  loadingGenero : boolean;
  loadingSedes : boolean;
  loadingTerapia : boolean;
  loadingTPersonal : boolean;
  loadingHorario : boolean;


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
        [Validators.required, Validators.minLength(8),Validators.pattern('^[0-9]*'), ],
      ],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      id_genero: [null, Validators.required],
      id_sede: [null, Validators.required],
      sueldo: [0, [Validators.required, Validators.min(0)]],
      id_tipopersonal: [null, Validators.required],
      id_terapia: [null, Validators.required],
      id_horariop: [null, Validators.required],
      cv: [null],
    });
  }



  ngOnInit(): void {
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
    if (this.personalForm.valid) {
      console.log(this.personalForm.value);
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
    this.loadingTPersonal = true;
    this.tiposPersonalList = this.tipoPersonalService.getAll().pipe(
      map((response: any) =>{
        this.loadingTPersonal = false;
        return response.data;
      }),
    );
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

  getSedesList(): void {
    this.loadingSedes = true;
    this.sedesList = this.sedesService.getAll().pipe(
      map((response: any) =>{
        this.loadingSedes = false;
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

  getHorariosList(): void {
    this.loadingHorario = true;
    this.horariosList = this.horarioPersonalService.getAll().pipe(
      map((response: any) =>{
        this.loadingHorario = false;
        return response.data;
      }),
    )
  }


  evtSelectFile(event: Event): void{
    const files = (event.target as HTMLInputElement).files;
    const file: File | null = files ? files[0] : null;
    this.archivo = file;
    this.personalForm.patchValue({
      cv: this.archivo
    })

    console.log(this.personalForm.value);
  }

}
