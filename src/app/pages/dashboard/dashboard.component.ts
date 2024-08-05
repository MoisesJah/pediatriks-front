import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/ui/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,RouterOutlet],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  navigateToSedes(event: Event): void {
    // Detener el comportamiento por defecto del click, si lo hubiera
    event.preventDefault();
    // Agregar clase seleccionada
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.style.backgroundColor = '#00e4ef';
    target.classList.add('selected');
    // Navegar al componente sedes
    this.router.navigate(['/sedes']);
  }

  navigateToReservarCita(event: Event): void {
    // Detener el comportamiento por defecto del click, si lo hubiera
    event.preventDefault();
    // Agregar clase seleccionada
    const target = event.currentTarget as HTMLElement;
    this.removeSelectedClass();
    target.style.backgroundColor = '#00e4ef';
    target.classList.add('selected');
    // Navegar al componente reservar-cita
    this.router.navigate(['/reservar-cita']);
  }

  private removeSelectedClass(): void {
    const selectedElements = document.querySelectorAll('.menu-item.selected');
    selectedElements.forEach(el => {
      el.classList.remove('selected');
      (el as HTMLElement).style.backgroundColor = '';
    });
  }
}
