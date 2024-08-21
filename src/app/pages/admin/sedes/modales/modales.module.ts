import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';



import { EditarModalComponent } from './editar-modal/editar-modal.component';



@NgModule({
  declarations: [

    EditarModalComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    FlatpickrModule.forRoot()
  ],
  exports: [

    EditarModalComponent
  ]
})

export class SedesModalsModule { }

