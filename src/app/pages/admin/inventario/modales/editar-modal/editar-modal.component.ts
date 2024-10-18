import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  inject,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditarModalComponent implements OnInit {
  modal = inject(NgbModal);
  inventarioService = inject(InventarioService); // Servicio de inventario
  isLoading = inject(LoadingService).isLoading;

  @Input() inventarioId: string | { id: string } = '';
  inventarioForm: FormGroup;

  @Output() onSaveComplete = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      banner_url: [''],
    });
  }

  ngOnInit(): void {
    if (typeof this.inventarioId === 'string') {
      this.loadInventarioData();
    } else if (
      typeof this.inventarioId === 'object' &&
      this.inventarioId.id
    ) {
      this.loadInventarioData(this.inventarioId.id);
    } else {
      console.error('ID del inventario no proporcionado o no es una cadena', this.inventarioId);
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.inventarioForm.valid) {
      const formData = new FormData();

      formData.append('nombre', this.inventarioForm.get('nombre')?.value);
      formData.append('descripcion', this.inventarioForm.get('descripcion')?.value);

      console.log('Datos que se envían:', this.inventarioForm.value);

      const id = typeof this.inventarioId === 'string' ? this.inventarioId : this.inventarioId.id;

      if (id) {
        this.inventarioService.update(id, formData).subscribe({
          next: () => {
            console.log('Actualización exitosa');
            this.onSaveComplete.emit();
            this.modal.dismissAll();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error al actualizar inventario:', err.message);
            alert('No se pudo actualizar el inventario. Intenta nuevamente.');
          },
        });
      } else {
        console.error('ID del inventario no proporcionado o en formato incorrecto');
      }
    }
  }


  private loadInventarioData(inventarioId?: string) {
    const id =
      inventarioId ||
      (typeof this.inventarioId === 'object' ? this.inventarioId.id : this.inventarioId);

    if (id) {
      this.inventarioService.getById(id).subscribe({
        next: (inventario) => {
          this.inventarioForm.patchValue(inventario.data);
        },
        error: (err) => {
          console.error('Error al cargar datos del inventario:', err);
        },
      });
    } else {
      console.error('ID del inventario no proporcionado');
    }
  }


}
