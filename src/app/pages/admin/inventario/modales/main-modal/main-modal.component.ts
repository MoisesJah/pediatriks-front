import { Component, inject } from '@angular/core';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaInventarioComponent } from "./tabla-inventario/tabla-inventario.component";
import { StockTerapistasComponent } from "./stock-terapistas/stock-terapistas.component";

@Component({
  selector: 'app-main-modal',
  standalone: true,
  imports: [NgbNavModule, TablaInventarioComponent, StockTerapistasComponent],
  templateUrl: './main-modal.component.html',
  styleUrl: './main-modal.component.scss'
})
export class MainModalComponent {
  modal = inject(NgbModal)

  close(){
    this.modal.dismissAll()
  }
}
