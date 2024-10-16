import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearModalComponent {
  modal = inject(NgbModal);
  inventarioService = inject(InventarioService);
  loadingService = inject(LoadingService);
  inventarioForm: FormGroup;
  isLoading = this.loadingService.isLoading;

  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      stock: ['', [Validators.required, Validators.min(1)]],
      banner_url: [''],
    });
  }

  evtSelectFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.inventarioForm.get('banner_url')?.setValue(files?.item(0));
  }

  ngOnInit(): void {}

  close() {
    this.modal.dismissAll();
  }

  save() {
    const formData = new FormData();
    Object.keys(this.inventarioForm.value).forEach((key) => {
      const control = this.inventarioForm.get(key);
      if (Array.isArray(control?.value)) {
        formData.append(key, JSON.stringify(control?.value));
      } else {
        formData.append(key, control?.value);
      }
    });


    this.inventarioService.create(formData).subscribe({
        next: () => {
            this.modal.dismissAll();
            this.onSaveComplete.emit();
        },
        error: (err: any) => {
            console.log(err);
        },
    });
  }
}
