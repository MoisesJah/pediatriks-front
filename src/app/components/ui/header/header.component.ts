import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';
import { ThemeService } from 'src/app/services/theme.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';
import { SolicitudInventario } from '../../../models/solicitud-inventario';
import { IUser } from 'src/app/models/user';
import { Inventario } from 'src/app/models/inventario';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, PopoverComponent],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  theme = inject(ThemeService);
  solicitudInventarioService = inject(SolicitudInventarioService);
  isLoadingService = inject(LoadingService);

  loading = false;

  user = this.authService.user();
  solicitudesPendientes: SolicitudInventario[] = [];
  totalsolicitudes : number=0;
  constructor() {

    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.loading = true;
    this.solicitudInventarioService.cargarSolicitudesPendientes().subscribe(
      (response) => {
        this.solicitudesPendientes = response.data;
        this.totalsolicitudes = response.total;
        console.log(this.solicitudesPendientes);

        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las solicitudes pendientes:', error);
        this.loading = false;
      }
    );
  }

   aceptarSolicitud(id_solicitud:string,id_personal_aprueba:string) {
    this.solicitudInventarioService.aceptarSolicitud(id_solicitud,id_personal_aprueba).subscribe({
      next: () => {
        console.log("Solicitud Aceptada")
         this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s.id_solicitud  !== id_solicitud);
       },
       error: (error) => {
         console.error('Error al aceptar solicitud:', error);
       }
     });
   }


   negarSolicitud(id_solicitud: string, id_personal_aprueba: string) {
    this.solicitudInventarioService.negarSolicitud(id_solicitud, id_personal_aprueba).subscribe({
      next: () => {
        console.log("Solicitud Negada");
        this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s.id_solicitud !== id_solicitud);
      },
      error: (error) => {
        console.error('Error al negar solicitud:', error);
      }
    });
  }


  removeCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setDarkTheme() {
    this.theme.setThemeMode('dark');
  }

  setLightTheme() {
    this.theme.setThemeMode('light');
  }

  setSystemTheme() {
    this.theme.setThemeMode('system');
  }

  logout() {
    this.authService.logout();
    this.removeCredentials();
    this.router.navigate(['/login']);
  }
}
