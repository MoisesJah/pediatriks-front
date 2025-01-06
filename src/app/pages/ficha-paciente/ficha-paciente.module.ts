import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaPacienteRoutingModule } from './ficha-paciente-routing.module';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule,
    FichaPacienteRoutingModule
  ]
})
export class FichaPacienteModule { }
