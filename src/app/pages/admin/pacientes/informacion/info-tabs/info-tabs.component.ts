import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TabTerapiasComponent } from './tab-terapias/tab-terapias.component';
import { TabHorariosComponent } from './tab-horarios/tab-horarios.component';
import { TabAsistenciaComponent } from './tab-asistencia/tab-asistencia.component';
import { TabInformesComponent } from './tab-informes/tab-informes.component';
import { TabPaquetesComponent } from './tab-paquetes/tab-paquetes.component';

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  imports: [
    NgbNavModule,
    TabTerapiasComponent,
    TabHorariosComponent,
    TabAsistenciaComponent,
    TabInformesComponent,
    TabPaquetesComponent
  ],
  templateUrl: './info-tabs.component.html',
})
export class InfoTabsComponent {}
