import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    CreateModalComponent,
    EditModalComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FlatpickrModule.forRoot(),
  ],
  exports: [
    CreateModalComponent,
    EditModalComponent,
    // DeleteModalComponent
  ]
})
export class PacientesModalsModule { }
