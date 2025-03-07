import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { Sede } from 'src/app/models/sede';
import { Subscription } from 'rxjs';
import flatpickr from 'flatpickr';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.scss']
})
export class EditarModalComponent implements OnInit, OnDestroy, AfterViewInit {
  sedeForm: FormGroup;
  isLoading = false;
  private subscriptions: Subscription = new Subscription();

  toast = inject(ToastrService)

  @Input() sedeId!: string;
  @Output() onSaveComplete = new EventEmitter<void>();

  @ViewChild('startTimePicker') startTimePicker!: ElementRef;
  @ViewChild('endTimePicker') endTimePicker!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sedeService: SedesService,
    private modalService: NgbModal
  ) {
    this.sedeForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      departamento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      horarioapertura: [''],
      horariocierre: [''],
      capacidadpacientes: [1, [Validators.required, Validators.min(1)]],
      numeroconsultorios: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.sedeId) {
      this.loadSedeData();
    } else {
      console.error('sedeId no está definido');
    }
  }

  ngAfterViewInit(): void {
    if (this.startTimePicker && this.startTimePicker.nativeElement) {
      flatpickr(this.startTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        defaultDate: this.sedeForm?.get('horarioapertura')?.value
      });
    }
    if (this.endTimePicker && this.endTimePicker.nativeElement) {
      flatpickr(this.endTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        defaultDate: this.sedeForm?.get('horariocierre')?.value
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSedeData(): void {
    this.isLoading = true;
    const subscription = this.sedeService.getById(this.sedeId).pipe(untilDestroyed(this)).subscribe({
      next: (response: any) => {
        if (response.status === 'success' && response.data) {
          this.sedeForm.patchValue(response.data);
          this.isLoading = false;
          this.ngAfterViewInit(); // Reinitialize Flatpickr after loading data
        } else {
          console.error('Error en la respuesta:', response);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar los datos de la sede:', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.add(subscription);
  }

  close(): void {
    this.modalService.dismissAll();
  }

  save(): void {
    if (this.sedeForm.valid) {
      this.isLoading = true;
      const sedeData: Sede = this.sedeForm.value;
      const subscription = this.sedeService.update(sedeData, this.sedeId).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modalService.dismissAll();
        },
        error: (error) => {
          if (error.error.errors) {
            const errors = Object.values(error.error.errors).join('\n');
            this.toast.error(errors, 'Error');
          } else {
            this.toast.error('Ocurrio un error al actualizar la sede', 'Error');
          }
        }
      });
      this.subscriptions.add(subscription);
    }
  }
}
