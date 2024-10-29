import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../ui/header/header.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DrawerComponent } from '../ui/drawer/drawer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DrawerComponent, RouterLink,RouterLinkActive,NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  offcanvas = inject(NgbOffcanvas);
  open: boolean = false;
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

  constructor(private router: Router) {}

  openOffcanvas() {
    this.open = true;
    this.offcanvas
      .open(DrawerComponent, { panelClass: 'w-100px' })
      .result.finally(() => (this.open = false));
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isPaciente(): boolean {
    return this.authService.isPaciente();
  }

  isTerapeuta(): boolean {
    return this.authService.isTerapista();
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

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach((el) => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
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

}
