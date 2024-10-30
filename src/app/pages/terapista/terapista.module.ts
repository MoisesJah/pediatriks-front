import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { FormsModule } from '@angular/forms';
import { TerapistaRoutingModule } from './terapista-routing.module';



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    TerapistaRoutingModule,
    FormsModule
  ]
})
export class TerapistaModule { }
