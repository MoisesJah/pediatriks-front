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

  constructor(private router: Router) {}

  openOffcanvas() {
    this.open = true;
    this.offcanvas
      .open(DrawerComponent, { panelClass: 'w-100px' })
      .result.finally(() => (this.open = false));
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
    console.log('Sedes');
  }

  navigateToReservarCita(event: Event): void {
    // Detener el comportamiento por defecto del click, si lo hubiera
    event.preventDefault();
    // Agregar clase seleccionada
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.classList.add('selected');
    // Navegar al componente reservar-cita
    this.router.navigate(['/dashboard/reservar-cita']);
  }

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach((el) => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
  }
}
