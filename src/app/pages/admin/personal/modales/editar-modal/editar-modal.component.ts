import { Component, EventEmitter, Inject,Input, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Personal } from 'src/app/models/personal';  // Ajusta la ruta según corresponda
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss']
})
export class EditarModalComponent implements OnInit {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  isLoading = inject(LoadingService).isLoading;

  @Input() personalId!: number; // Asegúrate de que el ID sea pasado como Input
  editForm: FormGroup;

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
    });
  }


  ngOnInit(): void {
    if (this.personalId) {
      this.loadPersonalData();
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.personalService
        .update(this.editForm.value, this.personalId)  // Asegúrate de que `update` sea el método correcto en el servicio
        .subscribe(() => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        });
    }
  }

  private loadPersonalData() {
    if (this.personalId) {
      this.personalService.getById(this.personalId).subscribe({
        next: (personal: Personal) => {
          this.editForm.patchValue(personal);
        },
        error: (err: HttpErrorResponse) => {  // Define el tipo de error como HttpErrorResponse
          console.error('Error loading personal data:', err.message);  // Usa err.message para obtener el mensaje de error
        }
      });
    }
  }
}
