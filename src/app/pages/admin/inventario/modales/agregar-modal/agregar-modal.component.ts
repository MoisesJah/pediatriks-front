import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AgregarModalComponent {
  modal = inject(NgbModal);
  inventarioService = inject(InventarioService);
  loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;

  @Input() inventarioId: string | { id: string } = '';
  inventarioForm: FormGroup;

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      stock: ['', [Validators.required, Validators.min(1)]],
      costo_stock: ['', [Validators.required, Validators.min(0)]],
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

  private loadInventarioData(inventarioId?: string) {
    const id =
      inventarioId ||
      (typeof this.inventarioId === 'object' ? this.inventarioId.id : this.inventarioId);

    if (id) {
      this.inventarioService.getById(id).subscribe({
        next: (inventario) => {
          this.inventarioForm.patchValue({
            costo_stock: inventario.data.costo_stock,
            stock: ''
          });
        },
        error: (err) => {
          console.error('Error al cargar datos del inventario:', err);
        },
      });
    } else {
      console.error('ID del inventario no proporcionado');
    }
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (!this.inventarioId) {
      console.error('El inventario no tiene un ID válido.');
      return;
    }

    if (this.inventarioForm.invalid) {
      console.error('El formulario no es válido.');
      return;
    }

    const formData = {
      id: this.inventarioId.toString(), 
      stock: this.inventarioForm.get('stock')?.value,
      costo_stock: this.inventarioForm.get('costo_stock')?.value,
    };

    this.inventarioService.addStock(formData).subscribe({
      next: (response) => {
        console.log('Stock agregado exitosamente:', response);
        this.close();
        this.onSaveComplete.emit();
      },
      error: (error) => {
        console.error('Error al agregar stock:', error);
      }
    });
  }
}
