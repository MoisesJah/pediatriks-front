import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventComponent } from './modal-event.component';
import { FlatpickrModule } from 'angularx-flatpickr'; // Importa FlatpickrModule
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ModalEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    FlatpickrModule.forRoot() // Agrega FlatpickrModule a los imports
  ],
  exports: [
    ModalEventComponent
  ]
})
export class ModalEventModule { }
