import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { LoadingService } from 'src/app/services/loading.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent {
  modal = inject(NgbModal);
  terapiasService = inject(TerapiaService);
  isLoading = inject(LoadingService).isLoading;

  @Output() onSaveComplete = new EventEmitter();

  terapiaForm: FormGroup;

  colorPalette = [
    "#c62828",
    "#ad1457",
    "#6a1b9a",
    "#4527a0",
    "#283593",
    "#1565c0",
    "#0277bd",
    "#00838f",
    "#00695c",
    "#2e7d32",
    "#558b2f",
    "#9e9d24",
    "#afb42b",
    "#f9a825",
    "#ff8f00",
    "#ef6c00",
    "#d84315",
    "#bf360c",
    "#4e342e",
    "#616161",
    "#37474f",
  ]

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time24hr: true,
    minTime: '00:00',
    defaultHour: 0,
    hourIncrement: 0,
    minuteIncrement: 15,
  };

  constructor(private fb: FormBuilder) {
    this.terapiaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      duracion: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      color: ['', Validators.required],
    });
  }

  save() {
    this.terapiasService.create(this.terapiaForm.value).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.dismissAll();
    });
  }

  close() {
    this.modal.dismissAll();
  }
}
