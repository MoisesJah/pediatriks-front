import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule si vas a usar ng-bootstrap
import { NgSelectModule } from '@ng-select/ng-select';


import { CrearModalComponent } from './crear-modal/crear-modal.component';
import { EditarModalComponent } from './editar-modal/editar-modal.component';
import { BorrarModalComponent } from './borrar-modal/borrar-modal.component';


@NgModule({
  declarations: [
    CrearModalComponent,
    EditarModalComponent,
    BorrarModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule
  ],
  exports: [
    CrearModalComponent,
    EditarModalComponent
  ]
})
export class PaquetesModalsModule { }
