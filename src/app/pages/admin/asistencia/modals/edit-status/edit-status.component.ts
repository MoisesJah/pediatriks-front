import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './edit-status.component.html',
})
export class EditStatusComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;
  asistenciaService = inject(AsistenciaService);
  id_asistencia = '';
  @Output() onSaveComplete = new EventEmitter();

  form: FormGroup;

  statusList = new Observable();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id_status: [null, Validators.required],
      observaciones: [''],
    });
  }

  ngAfterViewInit(): void {
      this.form.valueChanges.subscribe(v=>console.log(v))
  }

  getIcon(name: string) {
    switch (name) {
      case 'asistió':
        return 'h-10px w-10px bg-success rounded-pill';
      case 'tardanza':
        return 'h-10px w-10px bg-warning rounded-pill';
      case 'inasistencia':
        return 'h-10px w-10px bg-danger rounded-pill';
      case 'justificado':
        return 'h-10px w-10px bg-primary bg-opacity-75 rounded-pill';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.getStatusList();
  }

  close() {
    this.modal.dismissAll();
  }

  update() {
    if (this.form.valid) {
      this.asistenciaService
        .update(this.form.value, this.id_asistencia)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (data) => {
            this.onSaveComplete.emit();
            this.close();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  getStatusList() {
    this.statusList = this.asistenciaService.getStatusList().pipe(
      untilDestroyed(this)
    );
  }
}
