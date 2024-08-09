// src/app/pages/reservar-cita/reservar-cita.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservarCitaComponent } from './reservar-cita.component';
import { ReservarCitaRoutingModule } from './reservar-cita-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

@NgModule({
  declarations: [ReservarCitaComponent],
  imports: [
    CommonModule,
    ReservarCitaRoutingModule,
    FullCalendarModule,
    HeaderComponent
  ],
  exports: [ReservarCitaComponent],
})
export class ReservarCitaModule { }
