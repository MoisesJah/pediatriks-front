import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { FormsModule } from '@angular/forms';
import { TerapistaRoutingModule } from './terapista-routing.module';
import { CitasComponent } from './citas/citas.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,

    // CitasComponent,

    TerapistaRoutingModule,
    FormsModule
  ]
})
export class TerapistaModule { }
