import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import { ModalEditComponent } from './modal-edit.component'; // Ajusta la ruta si es necesario
import { ModalEditRoutingModule } from './modal-edit-routing.module'; // Ajusta la ruta si es necesario

@NgModule({
  declarations: [
    ModalEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalEditRoutingModule,
    FlatpickrModule.forRoot()
  ],
  exports: [
    ModalEditComponent
  ]
})
export class ModalEditModule { }
