import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateEventComponent } from './modal-event.component';
import { FlatpickrModule } from 'angularx-flatpickr'; // Importa FlatpickrModule
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalViewEventComponent } from './modal-view-event/modal-view-event.component';

@NgModule({
  declarations: [
    ModalCreateEventComponent,
    ModalViewEventComponent
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
    ModalCreateEventComponent
  ]
})
export class ModalEventModule { }
