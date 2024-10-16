import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  imports: [CommonModule, RouterLink,RouterLinkActive]
})
export class DrawerComponent {
  router = inject(Router);
  authService = inject(AuthService);
  showSubMenu: boolean = false;

  adminList = [
    {
      nombre: 'Usuarios',
      link: '/admin/usuarios',
    },
    {
      nombre: 'Personal',
      link: '/admin/personal',
    },
    {
      nombre: 'Pacientes',
      link: '/admin/pacientes',
    },
    {
      nombre: 'Terapias',
      link: '/admin/terapias',
    },
    {
      nombre: 'Sedes',
      link: '/admin/sedes',
    },
    {
      nombre: 'Paquetes',
      link: '/admin/paquetes',
    },
  ];

  isAdmin(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es administrador
    return this.authService.isAdmin();
  }

  isPaciente(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es paciente
    return this.authService.isPaciente();
  }

  isTerapeuta(): boolean {
    // Utiliza la función del servicio de autenticación para verificar si es terapeuta
    return this.authService.isTerapeuta();
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

  navigateToInventario(event: Event): void {
    event.preventDefault();
    this.removeSelectedClass();

    const target = event.currentTarget as HTMLElement;
    target.classList.add('selected');

    // Verificar si es administrador o terapeuta
    if (this.isAdmin()) {
      // Redirigir al inventario del administrador
      this.router.navigate(['/admin/inventario']);
    } else if (this.isTerapeuta()) {
      // Redirigir al inventario del terapeuta
      this.router.navigate(['/terapeuta/inventario']);
    } else {
      // Manejar otros roles o casos no reconocidos
      this.router.navigate(['/home']);
    }
  }

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach((el) => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
  }
}
