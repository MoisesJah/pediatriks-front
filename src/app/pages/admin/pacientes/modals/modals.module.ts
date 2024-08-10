import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { Select2Module } from 'ng-select2-component';



@NgModule({
  declarations: [
    CreateModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    //Select2Module
  ],
  exports: [
    CreateModalComponent
  ]
})
export class PacientesModalsModule { }
