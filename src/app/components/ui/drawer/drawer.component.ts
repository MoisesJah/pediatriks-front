import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  imports: [CommonModule]
})
export class DrawerComponent {
  router = inject(Router);
  authService = inject(AuthService);
  showSubMenu: boolean = false;


  isAdmin(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es administrador
    return this.authService.isAdmin();
  }

  isPaciente(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es paciente
    return this.authService.isPaciente();
  }

  navigateToSedes(event: Event): void {
    // Detener el comportamiento por defecto del click, si lo hubiera
    event.preventDefault();
    // Agregar clase seleccionada
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.classList.add('selected');
    // Navegar al componente sedes
    this.router.navigate(['/dashboard/sedes']);
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

  navigateToPaquetes(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.removeSelectedClass();
    this.router.navigate(['/admin/paquetes']);
    console.log('Paquetes');
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
