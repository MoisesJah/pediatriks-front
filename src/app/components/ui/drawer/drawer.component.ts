import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  standalone: true,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  router = inject(Router);
  
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
    this.router.navigate(['/dashboard/reservar-cita']);
  }

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach(el => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
  }
}
