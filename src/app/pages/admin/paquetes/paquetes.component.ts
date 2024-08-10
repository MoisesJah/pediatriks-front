import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes'; // Asegúrate de definir esta interfaz
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
 // Importa el componente del modal

@UntilDestroy()
@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit, OnDestroy {
  paquetes = inject(PaqueteService);
  isLoading = inject(LoadingService);
  modal = inject(NgbModal);

  paquetesList: Paquete[] = [];

  ngOnInit(): void {
    this.fetchPaquetes();
  }

  private fetchPaquetes() {
    this.paquetes.getAll()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: Paquete[]) => {
          console.log('Fetched paquetes:', response); // Agrega esto para depuración
          this.paquetesList = Array.isArray(response) ? response : [];
        },
        error: (err) => {
          console.error('Error fetching paquetes:', err);
          this.paquetesList = [];
        }
      });
  }


  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }


}
