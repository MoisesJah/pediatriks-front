import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSelectComponent } from 'src/app/components/ui/selects/user-select/user-select.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { GeneroSelectComponent } from 'src/app/components/ui/selects/genero-select/genero-select.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
//import { Select2Module } from 'ng-select2-component';



@NgModule({
  declarations: [
    CreateModalComponent,
    EditModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    UserSelectComponent,
    GeneroSelectComponent,
    FlatpickrModule.forRoot(),
    //Select2Module
  ],
  exports: [
    CreateModalComponent
  ]
})
export class PacientesModalsModule { }
