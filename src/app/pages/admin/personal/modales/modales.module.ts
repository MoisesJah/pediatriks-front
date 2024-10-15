import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule si vas a usar ng-bootstrap
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';


import { CrearModalComponent } from './crear-modal/crear-modal.component';
import { EditarModalComponent } from './editar-modal/editar-modal.component';
import { BorrarModalComponent } from './borrar-modal/borrar-modal.component';
import { HorariosListComponent } from './horarios-list/horarios-list.component';
import { NgxColorsModule } from 'ngx-colors';


@NgModule({
  declarations: [
    CrearModalComponent,
    EditarModalComponent,
    BorrarModalComponent,
    HorariosListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxColorsModule,
    FlatpickrModule.forRoot()
  ],
  exports: [
    CrearModalComponent,
    EditarModalComponent
  ]
})
export class PersonalModalsModule { }
