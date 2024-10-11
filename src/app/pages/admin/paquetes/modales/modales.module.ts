import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule si vas a usar ng-bootstrap
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ComprarModalComponent } from './comprar-modal/comprar-modal.component';
  

@NgModule({
  declarations: [

  
    ComprarModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    FlatpickrModule.forRoot()
  ],
  exports: [

  ]
})
export class PaquetesModalsModule { }
