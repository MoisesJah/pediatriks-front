import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaPermisosComponent } from '../tabla-permisos/tabla-permisos.component';
import { AsistenciaComponent } from 'src/app/pages/admin/asistencia/asistencia.component';
import { HeaderComponent } from "../../../../components/ui/header/header.component";

@Component({
  selector: 'app-main-tabs',
  standalone: true,
  imports: [NgbNavModule, TablaPermisosComponent, AsistenciaComponent, HeaderComponent],
  templateUrl: './main-tabs.component.html',
  styleUrl: './main-tabs.component.scss'
})
export class MainTabsComponent {

}
