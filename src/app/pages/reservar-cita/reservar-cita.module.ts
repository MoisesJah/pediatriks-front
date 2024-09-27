// src/app/pages/reservar-cita/reservar-cita.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservarCitaComponent } from './reservar-cita.component';
import { ReservarCitaRoutingModule } from './reservar-cita-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownComponent } from 'src/app/components/ui/dropdown/dropdown.component';
import { CreateModalComponent } from './cronograma/especialista/create-modal/create-modal.component';

@NgModule({
  declarations: [ReservarCitaComponent, CreateModalComponent],
  imports: [
    CommonModule,
    ReservarCitaRoutingModule,
    FullCalendarModule,
    HeaderComponent,
    NgSelectModule,
    DropdownComponent
  ],
  exports: [ReservarCitaComponent],
})
export class ReservarCitaModule { }
