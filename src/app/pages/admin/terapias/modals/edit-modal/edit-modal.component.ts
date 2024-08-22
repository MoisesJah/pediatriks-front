import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Terapia } from 'src/app/models/terapia';
import { LoadingService } from 'src/app/services/loading.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent implements OnInit {
  modal = inject(NgbActiveModal);
  terapiaService = inject(TerapiaService);
  isLoading = inject(LoadingService).isLoading;

  terapiaId: string | undefined;

  @Output() onSaveComplete = new EventEmitter();

  terapiaForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.terapiaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.terapiaService.getById(this.terapiaId!).subscribe((terapia) => {
      this.terapiaForm.patchValue(terapia.data);
    });
  }

  edit(terapia: Terapia) {
    this.terapiaService.update(terapia, this.terapiaId!).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    });
  }

  close() {
    this.modal.close();
  }
}
