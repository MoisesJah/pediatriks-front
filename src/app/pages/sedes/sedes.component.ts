import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss'] // Asegúrate de usar styleUrls en lugar de styleUrl
})
export class SedesComponent {
  selectedAddress: string | null = null;

  constructor(private router: Router) { }

  handleClick(event: MouseEvent): void {
    // Encuentra el elemento .menu-item más cercano al clic
    const target = event.target as HTMLElement;
    const menuItem = target.closest('.menu-item');

    if (menuItem) {
      const addressElement = menuItem.querySelector('b');
      if (addressElement) {
        // Obtiene el texto de la dirección desde el elemento <b>
        const address = addressElement.textContent?.trim() || 'Dirección no disponible';
        this.selectedAddress = address;
        console.log(`Agregando sede: (${address})`);
      }
    }
  }

  generarReserva(event: MouseEvent): void {
    event.preventDefault(); // Evita que el enlace haga una redirección

    if (this.selectedAddress) {
      console.log(`Reserva registrada en: (${this.selectedAddress})`);
      this.router.navigate(['/dashboard']);
    } else {
      console.log('No se ha seleccionado ninguna sede.');
    }
  }

  navigateToDashboard(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }

  navigateToReservarCita(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/reservar-cita']);
  }
}
