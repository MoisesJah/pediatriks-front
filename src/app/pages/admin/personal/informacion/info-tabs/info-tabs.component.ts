import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TabTerapiasComponent } from '../../../pacientes/informacion/info-tabs/tab-terapias/tab-terapias.component';
import { TabHorariosComponent } from '../../../pacientes/informacion/info-tabs/tab-horarios/tab-horarios.component';
import { TabAsistenciaComponent } from '../../../pacientes/informacion/info-tabs/tab-asistencia/tab-asistencia.component';
import { TabInformesComponent } from '../../../pacientes/informacion/info-tabs/tab-informes/tab-informes.component';
import { TabPaquetesComponent } from '../../../pacientes/informacion/info-tabs/tab-paquetes/tab-paquetes.component';
import { InfoAtencionesComponent } from './info-atenciones/info-atenciones.component';
import { InfoAsistenciasComponent } from './info-asistencias/info-asistencias.component';
import { InfoMensualComponent } from './info-mensual/info-mensual.component';

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [
    NgbNavModule,
    InfoAtencionesComponent,
    InfoAsistenciasComponent,
    InfoMensualComponent
  ],
  templateUrl: './info-tabs.component.html',
})
export class InfoTabsComponent {}
