import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule si vas a usar ng-bootstrap


import { CrearModalComponent } from './crear-modal/crear-modal.component';
import { EditarModalComponent } from './editar-modal/editar-modal.component';


@NgModule({
  declarations: [
    CrearModalComponent,
    EditarModalComponent,
    EditarModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    CrearModalComponent,
    EditarModalComponent
  ]
})
export class PersonalModalsModule { }