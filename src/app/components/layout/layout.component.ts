import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../ui/header/header.component';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../ui/drawer/drawer.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent,DrawerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  offcanvas = inject(NgbOffcanvas);
  open: boolean = false;
  authService = inject(AuthService);
  showSubMenu: boolean = false;

  constructor(private router: Router) {}

  openOffcanvas() {
    this.open = true;
    this.offcanvas
      .open(DrawerComponent, { panelClass: 'w-100px' })
      .result.finally(() => (this.open = false));
  }

  isAdmin(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es administrador
    return this.authService.isAdmin();
  }

  isPaciente(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es paciente
    return this.authService.isPaciente();
  }


  navigateToInicio(event: Event): void {
    event.preventDefault();
    this.removeSelectedClass();

    const target = event.currentTarget as HTMLElement;
    target.classList.add('selected');

    // Verificar el rol del usuario y navegar a la ruta correspondiente
    if (this.isAdmin()) {
      // Redirigir al inicio del Administrador
      this.router.navigate(['/admin/dashboard']);
    } else if (this.isPaciente()) {
      // Redirigir al inicio del Paciente
      this.router.navigate(['/dashboard']);
    } else {
      // Manejar otros casos o roles no reconocidos
      this.router.navigate(['/home']);
    }
  }


  navigateToReservarCita(event: Event): void {
    // Detener el comportamiento por defecto del click, si lo hubiera
    event.preventDefault();
    // Agregar clase seleccionada
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.classList.add('selected');
    // Navegar al componente reservar-cita
    this.router.navigate(['/admin/reservar-cita']);
  }

  navigateToSede(event: Event): void {
    event.preventDefault();
    event.stopPropagation(); // Esto detiene la propagación del evento hacia otros manejadores
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.classList.add('selected');
    this.router.navigate(['/admin/sedes']);
    console.log('Sedes');
  }

  navigateToPaquetes(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/paquetes']);
    console.log('Paquetes');
  }

  navigateToPersonal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/personal']);
    console.log('Personal');
  }

  navigateToUsuarios(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/usuarios']);
    console.log('Usuarios');
  }

  navigateToTerapias(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/terapias']);
  }

  navigateToPacientes(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/pacientes']);
  }

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach((el) => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
  }

}
